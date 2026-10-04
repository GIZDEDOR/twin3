import Link from 'next/link';

export default function ProjectNotFound() {
  return <main className="fixed inset-0 z-[130] flex min-h-[100dvh] items-center justify-center bg-dark px-6 text-white">
    <div className="max-w-xl text-center">
      <h1 className="text-4xl">Кейс не найден</h1>
      <p className="font-standard mt-6 text-lg text-neutral-300">Возможно, он ещё не опубликован или адрес изменился.</p>
      <Link href="/projects" className="font-standard mt-8 inline-block rounded-xl border border-neutral-500 px-6 py-3">Все проекты</Link>
    </div>
  </main>;
}
