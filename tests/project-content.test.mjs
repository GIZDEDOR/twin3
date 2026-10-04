import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hasProjectContent, projectContactUrl, projectDescription, projectPath,
  projectVideos, projectVideoSchema, safeWebUrl,
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
  assert.equal(schema.uploadDate, '2024-08-01T12:00:00+0000');
  assert.equal(schema.duration, 'PT42S');
  assert.equal(schema.url, 'https://twin3d.ru/projects/yota');
  assert.equal(schema.contentUrl, project.data.videos[0].video.url);
  project.data.videos[0].poster = {};
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
