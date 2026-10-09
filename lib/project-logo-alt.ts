// Keep legacy company labels as the fallback; never identify different VK campaigns by brand alone.
const byIdentity: Record<string, string> = {
  yota: 'Yota', 'x5-pyaterochka': 'Пятёрочка', 'amazing-red': 'Amazing Red',
  coolcola: 'CoolCola', 'vk-video': 'VK Видео',
  kino: 'Постеры фильмов с цифровыми двойниками Twin3D', dinopark: 'Амурский Динопарк',
};
const byCompany: Record<string, string> = {
  'ситидрайв': 'Ситидрайв', 'амбене': 'Промомед, бренд «Амбене»',
  'yandex': 'Яндекс Браузер', 'dino': 'Доктор Динозавров', 'ржд': 'РЖД-Технологии',
  'rusagro': 'Русагро', 'kret': 'КРЭТ', 'citymobil': 'Ситимобил', 'sber': 'Сбер', 'mhl': 'МХЛ',
};
const byFile: Record<string, string> = {
  'VK_Music.webm': 'VK Музыка', 'вктайланд.webm': 'VK Видео × ТНТ',
  'Puma0001-0404.webm': 'PUMA',
};
export function projectLogoAlt(identity: string, company: string, video?: string | null): string {
  let file = '';
  try { file = decodeURIComponent(new URL(video || '').pathname.split('/').pop() || ''); } catch { /* No media. */ }
  return byFile[file] || byIdentity[identity] || byCompany[company.trim().toLowerCase()] || company;
}
