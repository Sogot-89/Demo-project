import { createFileRoute } from '@tanstack/react-router'

import { Counter } from '@/features/counter'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <section className="mx-auto max-w-md text-center">
      <h1 className="mb-6 text-2xl font-bold">
        Vite + React + TanStack Router
      </h1>
      <p className="mb-8 text-gray-600">
        A starter wired up with Zustand, Tailwind, Jest, and Playwright.
      </p>
      <Counter />
    </section>
  )
}
