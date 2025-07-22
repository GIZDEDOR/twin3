// app/api/video/[...slug]/route.ts
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  // собираем путь в CDN из params.slug, например: ["twin3","aHbVbEMqNJQqH8Rf_showreel.webm"]
  const cdnPath = params.slug.join('/');
  const upstreamUrl = `https://twin3.cdn.prismic.io/${cdnPath}`;

  // берём оригинальный Range‑заголовок (или пустую строку)
  const range = request.headers.get('range') || '';

  // форвардим запрос к Prismic с тем же Range
  const upstreamRes = await fetch(upstreamUrl, {
    headers: {
      // важно: если range пустой, поставить заголовок пустым тоже безопасно
      Range: range,
    },
  });

  // копируем все заголовки от CDN
  const responseHeaders = new Headers(upstreamRes.headers);

  // Убираем Content-Disposition: attachment, чтобы браузер встраивал видео
  responseHeaders.delete('content-disposition');
  // Гарантируем, что клиент увидит Accept-Ranges
  responseHeaders.set('Accept-Ranges', 'bytes');

  // отдаём поток напрямую клиенту с тем же статусом (200 или 206)
  return new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    headers: responseHeaders,
  });
}
