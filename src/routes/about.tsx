import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">About</h1>
      <p className="text-gray-600">
        This project follows the architecture and testing rules defined in
        <code className="mx-1 rounded bg-gray-200 px-1">CLAUDE.md</code>.
      </p>
    </section>
  )
}
