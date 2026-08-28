import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="p-8 text-center text-gray-600">Page not found</div>
  ),
})

const linkClasses =
  'font-medium text-gray-600 transition-colors hover:text-gray-900 [&.active]:text-blue-600'

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex gap-6 border-b border-gray-200 bg-white px-6 py-4">
        <Link to="/" className={linkClasses}>
          Home
        </Link>
        <Link to="/about" className={linkClasses}>
          About
        </Link>
      </nav>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}
