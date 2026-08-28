# System Prompt Extensions: React Dashboard & Login (TypeScript)

This document provides explicit context, tech stack rules, configuration baselines, and implementation guidelines for building and testing the React Dashboard and Login application.

---

## Tech Stack

*   **Framework:** React 19 (Vite + TypeScript)
*   **Styling:** Tailwind CSS v4
*   **State Management:** React Context API (AuthContext)
*   **Testing (Unit/Component):** Jest, React Testing Library, ts-jest
*   **Testing (E2E):** Playwright

---

## Architectural Principles & Layout

### Directory Layout
```text
src/
├── assets/         # Charts, images, static icons
├── components/     # Reusable UI elements
│   └── ui/         # Base UI components (Button, Input, Card)
├── context/        # Auth state provider
├── hooks/          # Custom hooks (useAuth, useDashboardData)
├── layouts/        # DashboardLayout, AuthLayout
├── pages/          # Login, Dashboard (Charts Overview)
├── types/          # Global TypeScript interfaces
└── utils/          # Helpers, validators, test-mocks
```

### Component Guidelines
*   Write pure functional components using arrow functions.
*   Enforce strict TypeScript definitions for all props and data contracts. Never use `any`.
*   Separate business/data fetching logic from UI layers using custom hooks.
*   Incorporate `data-testid` attributes on all interactive elements (inputs, buttons, cards) for resilient testing.

---

## Implementation Requirements

### 1. Authentication Flow
*   **Login Page:** Email and password inputs with real-time validation. 
*   **Route Protection:** Use a wrapper component (`ProtectedRoute`) to check auth tokens. Divert unauthenticated requests to `/login`.
*   **Session Management:** Synchronize token storage inside `localStorage`.

### 2. Dashboard & Analytical Charts
*   **Layout:** A collapsible, responsive sidebar navigation matched with a universal user profile header.
*   **Data Presentation:** A responsive layout containing interactive operational metric summaries.
*   **Charts:** Implement standard data visualization configurations (e.g., using safe lightweight charting wrappers or custom SVG layouts) tracking monthly performance trends, category distributions, and real-time event tables.

---

## Code Quality & Technical Rules

*   **TypeScript:** Enforce `strict: true` inside `tsconfig.json`. Ensure all API payloads, chart datasets, and event responses map to explicit `interfaces`.
*   **Tailwind CSS v4:** Utilize native utility classes exclusively. Structure elements using flexible layouts (`flex`, `grid`) configured with mobile-first breakpoints (`md:`, `lg:`).

---

## Configuration Reference Baselines

### 1. Jest Configuration (`jest.config.ts`)
```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
};

export default config;
```

### 2. Playwright E2E Configuration (`playwright.config.ts`)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Testing Strategy

### Component & Unit Tests (Jest)
*   Isolate and test form layout validation schemas (`utils/validators`).
*   Mock authentication API contexts using `jest.fn()` wrappers to emulate pending, rejected, and resolved network flows.
*   Assert chart container layout calculations by passing customized data fixtures.

### End-to-End User Journeys (Playwright)
*   **Flow 1:** Verify automated login execution, valid session validation, and post-auth redirect triggers.
*   **Flow 2:** Assert robust state protection rules by checking manual URL manipulation re-routing actions.
*   **Flow 3:** Assert responsive layout integrity by scaling test runner viewports across standard mobile and desktop environments.


## Git Conventions

- **Branch naming**: `{initials}/{description}` (e.g., `jd/fix-login`)
- **Commit format**: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- **PR titles**: Same as commit format

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm test             # Run tests
npm run lint         # Run linter
npm run typecheck    # Check types

# Git
npm run commit       # Interactive commit
gh pr create         # Create PR
```