import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hasProjectContent, projectContactUrl, projectDescription, projectPath,
  projectVideos, projectVideoSchema, safeWebUrl, resultPresentation, participantFields, relatedProjects,
} from '../lib/project-content.ts';
import { previewProject } from '../dev/project-fixture.ts';

test('empty documents are not exposed as case pages', () => {
  assert.equal(hasProjectContent(previewProject), true);
  assert.equal(hasProjectContent({ ...previewProject, uid: null }), false);
  assert.equal(hasProjectContent({ ...previewProject, data: { ...previewProject.data, title: '  ' } }), false);
});

test('media and CTA links reject executable and malformed URLs', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,hello', 'not a URL']) {
    assert.equal(safeWebUrl({ link_type: 'Web', url }), null);
  }
  assert.equal(safeWebUrl({ link_type: 'Any' }), null);
  assert.equal(safeWebUrl({ link_type: 'Web', url: 'https://videos.twin3d.ru/movie.webm' }), 'https://videos.twin3d.ru/movie.webm');
});

test('blank video rows are omitted and editor order is preserved', () => {
  const video = previewProject.data.videos[0];
  const project = { ...previewProject, data: { ...previewProject.data, videos: [
    { ...video, video: { link_type: 'Any' } },
    { ...video, name: 'Главный ролик' },
    { ...video, name: 'Второй ролик' },
  ] } };
  assert.deepEqual(projectVideos(project).map((item) => item.name), ['Главный ролик', 'Второй ролик']);
});

test('VideoObject requires real upload date and thumbnail, never substitutes document date', () => {
  assert.deepEqual(projectVideoSchema(previewProject), []);
  const project = structuredClone(previewProject);
  project.uid = 'yota';
  project.data.videos[0].upload_date = '2024-08-01T12:00:00+0000';
  project.data.videos[0].duration_seconds = 42;
  const [schema] = projectVideoSchema(project);
  assert.equal(schema.uploadDate, '2024-08-01T12:00:00.000Z');
  assert.equal(schema.duration, 'PT42S');
  assert.equal(schema.url, 'https://twin3d.ru/projects/yota');
  assert.equal(schema.contentUrl, project.data.videos[0].video.url);
  assert.equal(schema.name,project.data.title);
  assert.equal(schema.description,project.data.meta_description);
  assert.deepEqual(schema.thumbnailUrl,[project.data.og_image.url]);
  project.data.og_image = {};
  assert.deepEqual(projectVideoSchema(project), []);
});

test('descriptions have useful fallbacks without HTML', () => {
  const project = structuredClone(previewProject);
  project.data.meta_description = '';
  assert.equal(projectDescription(project), project.data.summary);
  project.data.summary = null;
  assert.match(projectDescription(project), /Создать серию роликов/);
});

test('contact links carry the case context', () => {
  const project = structuredClone(previewProject);
  project.uid = 'yota';
  assert.match(new URL(projectContactUrl(project)).searchParams.get('text'), /https:\/\/twin3d.ru\/projects\/yota/);
  project.data.contact_link = { link_type: 'Web', url: 'https://twin3d.ru/contact?source=case' };
  const url = new URL(projectContactUrl(project));
  assert.equal(url.searchParams.get('project'), 'yota');
  assert.equal(url.searchParams.get('source'), 'case');
  assert.equal(projectPath('a/b'), '/projects/a%2Fb');
});


const { legacyProjectSlug, projectCardDestination } = await import('../lib/project-card.ts');
test('all ten cases resolve internally after publication', () => {
  const cards = [
    [{title:'YOTA'},'yota'], [{title:'ПЯТЁРОЧКА'},'x5-pyaterochka'],
    [{company:'Hennessy'},'hennessy'], [{company:'AMAZING RED'},'amazing-red'],
    [{title:'COOLCOLA'},'coolcola'], [{title:'VK Видео'},'vk-video'],
    [{title:'КХЛ'},'khl'], [{title:'Динопарк'},'dinopark'],
    [{title:'RuStore'},'rustore'], [{title:'GROM'},'kino'],
  ];
  for (const [card, slug] of cards) {
    assert.equal(legacyProjectSlug(card), slug);
    assert.equal(projectCardDestination(card, {}, [slug]).projectUrl, `/projects/${slug}`);
    assert.equal(projectCardDestination(card, {}, [slug]).externalUrl, null);
  }
});
test('unpublished target cases never lead to Behance or a missing internal page', () => {
  assert.deepEqual(projectCardDestination({title:'YOTA',link:{url:'https://www.behance.net/gallery/205531607/Yota'}}), {projectUrl:null,externalUrl:null});
});
test('other VK and dinosaur projects keep their own links', () => {
  for (const title of ['VK Музыка', 'ВК ГЛАЗКИ', 'DOKTOR DINOZAVRF']) {
    const card={title,company:'VK',link:{url:'https://www.behance.net/gallery/230394091/example'}};
    assert.equal(legacyProjectSlug(card),null);
    assert.equal(projectCardDestination(card).externalUrl,card.link.url);
  }
});
test('explicit Prismic relationship overrides legacy identification', () => {
  const card={title:'YOTA',project:{id:'new-document'}};
  assert.equal(projectCardDestination(card, {'new-document':'updated-yota'}, ['yota']).projectUrl,'/projects/updated-yota');
});

test('long legacy result stays readable and structured results use separate fields', () => {
  const p=structuredClone(previewProject);
  assert.equal(resultPresentation(p).headline,'');
  assert.deepEqual(resultPresentation(p).details,p.data.result);
  p.data.result_headline='Короткий результат';
  p.data.result_details=[{type:'paragraph',text:'Подробности',spans:[]}];
  assert.equal(resultPresentation(p).headline,'Короткий результат');
  assert.deepEqual(resultPresentation(p).details,p.data.result_details);
  p.data.result_details=[];p.data.result=[{type:'paragraph',text:p.data.result_headline,spans:[]}];
  assert.deepEqual(resultPresentation(p).details,[]);
});
test('explicit VFX field and legacy labelled credits remain separate', () => {
  const p=structuredClone(previewProject);p.data.agency='Instinct; VFX Clan';
  assert.deepEqual(participantFields(p),{agency:'Instinct',vfx:'Clan'});
  p.data.agency='Ozio';p.data.vfx='Clan';
  assert.deepEqual(participantFields(p),{agency:'Ozio',vfx:'Clan'});
});
test('related projects use the first direction and exclude the current case', () => {
  const p=structuredClone(previewProject);
  const others=Array.from({length:5},(_,i)=>({...p,id:`id-${i}`,uid:`case-${i}`,data:{...p.data,noindex:false}}));
  const result=relatedProjects(p,[p,...others]);
  assert.equal(result.length,3);assert.ok(result.every(x=>x.uid!==p.uid));
  assert.equal(relatedProjects({...p,data:{...p.data,directions:[{direction:'Аватары'}]}},others).length,0);
});

test('all case goals send slug to the configured Metrica counter', async () => {
  const {sendCaseGoal}=await import('../lib/case-analytics.ts');
  const oldWindow=globalThis.window, oldId=process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  try {
    const calls=[];globalThis.window={ym:(...args)=>calls.push(args)};
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID='123456';
    for(const event of ['case_open','video_play','cta_click','behance_click']) assert.equal(sendCaseGoal(event,'yota'),true);
    assert.deepEqual(calls.map(c=>c[3]),Array(4).fill({slug:'yota'}));
    assert.ok(calls.every(c=>c[0]===123456&&c[1]==='reachGoal'));
    globalThis.window={};assert.equal(sendCaseGoal('case_open','yota'),false);
  } finally {
    if(oldWindow===undefined) delete globalThis.window;else globalThis.window=oldWindow;
    if(oldId===undefined) delete process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;else process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID=oldId;
  }
});

test('global Metrica initializes once and tracks initial, query, case and back navigation', async () => {
  const { trackMetrikaPage } = await import('../lib/yandex-metrika.ts');
  const oldWindow = globalThis.window, oldDocument = globalThis.document;
  const scripts = [];
  try {
    globalThis.window = {};
    globalThis.document = {
      scripts, title: 'Twin3D', referrer: 'https://example.com/',
      createElement: () => ({}), head: { appendChild: script => scripts.push(script) },
    };
    trackMetrikaPage(NaN, 'https://twin3d.ru/');
    assert.equal(scripts.length, 0);
    const urls = ['/', '/projects', '/projects/yota', '/projects', '/blog', '/blog?page=2'];
    for (const path of urls) {
      trackMetrikaPage(90931287, `https://twin3d.ru${path}`);
      trackMetrikaPage(90931287, `https://twin3d.ru${path}`);
    }
    const calls = globalThis.window.ym.a;
    assert.equal(scripts.length, 1);
    const init = calls.filter(c => c[1] === 'init');
    assert.equal(init.length, 1);
    assert.equal(init[0][2].defer, true);
    const hits = calls.filter(c => c[1] === 'hit');
    assert.deepEqual(hits.map(c => c[2]), urls.map(p => `https://twin3d.ru${p}`));
    assert.equal(hits[0][3].referer, 'https://example.com/');
    assert.equal(hits[3][3].referer, 'https://twin3d.ru/projects/yota');
    delete globalThis.window.twin3Metrika;
    trackMetrikaPage(90931287, 'https://twin3d.ru/about');
    assert.equal(calls.filter(c => c[1] === 'init').length, 1);
    assert.equal(scripts.length, 1);
  } finally {
    if (oldWindow === undefined) delete globalThis.window; else globalThis.window = oldWindow;
    if (oldDocument === undefined) delete globalThis.document; else globalThis.document = oldDocument;
  }
});
