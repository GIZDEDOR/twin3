import { execFileSync } from 'node:child_process';
const origin = process.argv[2] || 'https://twin3d.ru';
const slugs = ['', 'yota', 'x5-pyaterochka', 'hennessy', 'amazing-red', 'coolcola', 'vk-video', 'khl', 'dinopark', 'rustore', 'kino'];
console.log('url,attempt,http_status,ttfb_seconds');
for (const slug of slugs) {
  const url = `${origin}/projects${slug ? '/' + slug : ''}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = execFileSync('curl', ['-L', '--max-time', '30', '-sS', '-o', '/dev/null', '-H', 'Cache-Control: no-cache', '-w', '%{http_code},%{time_starttransfer}', url], { encoding: 'utf8' });
      console.log(`${url},${attempt},${result}`);
    } catch { console.log(`${url},${attempt},ERROR,`); process.exitCode = 1; }
  }
}
// no-cache asks intermediaries to revalidate; a truly cold origin cache needs server-side control.
