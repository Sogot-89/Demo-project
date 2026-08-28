# React Dashboard & Login

React 19 + Vite + TypeScript app with an authenticated analytics dashboard, built to the
architecture in [`CLAUDE.md`](./CLAUDE.md).

## Stack

- React 19 (Vite + TypeScript, `strict: true`)
- Tailwind CSS v4 (native utilities via `@tailwindcss/vite`)
- React Context API for auth state (`src/context/AuthContext.tsx`)
- Jest + React Testing Library + ts-jest (unit/component)
- Playwright (E2E)

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
```

Any well-formed email/password (8+ chars) signs in against the mock API in
`src/utils/api.ts`. Use `denied@example.com` to exercise the rejection path.

## Scripts

| Command             | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the Vite dev server        |
| `npm run build`     | Type-check and build for prod    |
| `npm test`          | Jest unit/component tests        |
| `npm run test:e2e`  | Playwright end-to-end tests      |
| `npm run lint`      | ESLint                           |

## Layout

```
src/
├── assets/         # static icons
├── components/     # UI + charts (ui/ has Button, Input, Card)
├── context/        # AuthContext provider
├── hooks/          # useAuth, useDashboardData
├── layouts/        # AuthLayout, DashboardLayout
├── pages/          # Login, Dashboard, NotFound
├── types/          # global interfaces
└── utils/          # validators, api mock, fixtures
e2e/                # Playwright specs (auth, responsive)
```

## Testing

- **Unit/component:** validators, `AuthProvider` (pending/resolved/rejected flows via
  `jest.fn()`), the Login form, and chart layout math.
- **E2E:** login + redirect, protected-route redirection on manual URL access, and
  responsive layout across mobile/desktop viewports.
