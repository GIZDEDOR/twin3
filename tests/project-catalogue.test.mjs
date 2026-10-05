import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildProjectCatalogue, catalogueFile, normalizeCatalogueTags, caseCountLabel } from '../lib/project-catalogue.ts';
import { projectCardDestination } from '../lib/project-card.ts';
const sources = JSON.parse(readFileSync(new URL('./fixtures/project-catalogue.json', import.meta.url)));
const cards = buildProjectCatalogue(sources);
const byFile = name => cards.find(c => catalogueFile(c.destinationSource) === name && !c.synthetic);

test('audited catalogue: only approved members disappear; raw data is untouched', () => {
  const copy = structuredClone(sources);
  buildProjectCatalogue(sources);
  assert.equal(sources.length, 43);
  assert.equal(cards.length, 33);
  assert.equal(cards.filter(c => c.synthetic).length, 0);
  assert.deepEqual(sources, copy);
  const absorbed = new Set(['VK_3.webm','VK_2.webm','VK_insta_v3.webm','CC3.webm','CoolColaBill.webm','CC2.webm','СС1.webm','MAXIM-2.webm','CITYDRIVE0001-0500.webm','VK_Music.webm']);
  assert.deepEqual(cards.filter(c=>!c.synthetic).map(c=>catalogueFile(c.destinationSource)), sources.filter(s=>!absorbed.has(catalogueFile(s))).map(catalogueFile));
});
test('all grouped source fields, video URLs, posters, and Behance links are retained', () => {
  for(const [main, indexes] of [['vk_federal.webm',[17,13,12,19]],['сс_chars_v2.webm',[10,21,20,14,15]],['DILARA-2.webm',[7,8]],['SBERREGA.webm',[9,23]]]) {
    const c=byFile(main), expected=indexes.map(i=>sources[i-1]);
    assert.deepEqual(c.sources,expected);
    assert.deepEqual(c.videos.map(v=>v.src),expected.map(s=>s.fullVideo.url));
    assert.deepEqual(c.videos.map(v=>v.poster),expected.map(s=>s.poster.url));
    assert.equal(c.item.link.url,expected.find(s=>s.link?.url).link.url);
  }
  assert.ok(byFile('сс_chars_v2.webm').videos.some(v=>decodeURIComponent(v.src).endsWith('/СС1.webm')));
});
test('all six original films remain without a synthetic general card', () => {
  const filmCards=cards.filter(c=>c.isFilm);
  assert.equal(filmCards.length,6);
  assert.deepEqual(filmCards.map(c=>c.destinationSource),[5,16,31,32,40,42].map(n=>sources[n-1]));
  assert.ok(filmCards.every(c=>c.sources.length===1));
  assert.ok(cards.every(c=>!c.synthetic && c.item.title!=='Цифровые двойники для кино'));
});
test('unrelated VK, dinosaur, transport and avatar projects remain separate', () => {
  for(const n of [3,24,25,27,28,30,33,34,35,37,39,41]) {
    const c=byFile(catalogueFile(sources[n-1]));
    assert.ok(c,`missing source ${n}`);assert.equal(c.sources.length,1);
  }
});
test('matching is independent of order and brand; extra projects are never truncated', () => {
  assert.equal(buildProjectCatalogue([...sources].reverse()).length,33);
  const extra={...sources[16],fullVideo:{url:'https://videos.twin3d.ru/media/videos/another-vk.webm'}};
  const result=buildProjectCatalogue([...sources,extra]);assert.equal(result.length,34);
  assert.ok(result.some(c=>c.destinationSource===extra));
  const noMain=sources.filter(s=>catalogueFile(s)!=='vk_federal.webm');
  assert.equal(buildProjectCatalogue(noMain).filter(c=>['VK_2.webm','VK_3.webm','VK_insta_v3.webm'].includes(catalogueFile(c.destinationSource))).length,3);
});
test('category counts and tag intersections use visible projects only', () => {
  const counts=Object.fromEntries([...new Set(cards.map(c=>c.item.category))].map(cat=>[cat,cards.filter(c=>c.item.category===cat).length]));
  assert.deepEqual(counts,{'АВАТАРЫ':6,'РЕКЛАМА':21,'КИНО':6});
  assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),33);
  const tags=[...new Set(cards.flatMap(c=>normalizeCatalogueTags(c.item.tags)))];
  assert.deepEqual(tags.sort(),['3D-ПРОДАКШН','3D-СКАНИРОВАНИЕ','АВАТАРЫ','ИИ-ПРОДАКШН'].sort());
  for(const category of Object.keys(counts)) for(const tag of tags) {
    const filtered=cards.filter(c=>c.item.category===category && normalizeCatalogueTags(c.item.tags).includes(tag));
    assert.equal(new Set(filtered.map(c=>c.synthetic?'kino':catalogueFile(c.destinationSource))).size,filtered.length);
  }
  assert.deepEqual([1,2,4,5,11,12,14,21,22].map(caseCountLabel),['КЕЙС','КЕЙСА','КЕЙСА','КЕЙСОВ','КЕЙСОВ','КЕЙСОВ','КЕЙСОВ','КЕЙС','КЕЙСА']);
});
test('existing cases resolve; FreshBar and Citydrive retain Behance', () => {
  const slugs=['yota','x5-pyaterochka','hennessy','amazing-red','coolcola','vk-video','khl','dinopark','rustore','kino'];
  for(const [file,slug] of [['vk_federal.webm','vk-video'],['сс_chars_v2.webm','coolcola']]) {
    assert.equal(projectCardDestination(byFile(file).destinationSource,{},slugs).projectUrl,`/projects/${slug}`);
  }
  for(const [file,gallery] of [['DILARA-2.webm','249710895'],['SBERREGA.webm','242744159']]) {
    const card=byFile(file);
    const destination=projectCardDestination(card.destinationSource,{},slugs);
    assert.equal(destination.projectUrl,null);
    const link=destination.externalUrl || card.item.link?.url;
    assert.ok(link.includes(`/gallery/${gallery}/`));
  }
});
