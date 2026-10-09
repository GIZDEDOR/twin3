import test from 'node:test';
import assert from 'node:assert/strict';
import { projectLogoAlt } from '../lib/project-logo-alt.ts';
test('approved logo labels do not mix VK campaigns or rewrite excluded companies', () => {
  for (const [id,alt] of Object.entries({yota:'Yota','x5-pyaterochka':'Пятёрочка','amazing-red':'Amazing Red',coolcola:'CoolCola','vk-video':'VK Видео',kino:'Постеры фильмов с цифровыми двойниками Twin3D',dinopark:'Амурский Динопарк'})) assert.equal(projectLogoAlt(id,'legacy'),alt);
  for(const [company,alt] of Object.entries({'СИТИДРАЙВ':'Ситидрайв','Амбене':'Промомед, бренд «Амбене»','YANDEX':'Яндекс Браузер','DINO':'Доктор Динозавров','РЖД':'РЖД-Технологии','RUSAGRO':'Русагро','KRET':'КРЭТ','CITYMOBIL':'Ситимобил','SBER':'Сбер','MHL':'МХЛ'})) assert.equal(projectLogoAlt('',company),alt);
  for(const [file,alt] of Object.entries({'VK_Music.webm':'VK Музыка','вктайланд.webm':'VK Видео × ТНТ','Puma0001-0404.webm':'PUMA'})) assert.equal(projectLogoAlt('','VK',`https://videos.twin3d.ru/${encodeURIComponent(file)}`),alt);
  for(const company of ['Hennessy','Газпромбанк','RuStore','Sensia','КХЛ','FreshBar','Анвимакс','BetBoom','FESCO']) assert.equal(projectLogoAlt('',company),company);
});
