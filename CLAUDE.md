# Claude Instructions: React, Playwright, Jest, Tailwind, Zustand, & TanStack Router

This document defines the architecture, coding standards, and testing rules for this React project. Follow these guidelines strictly.

## 🏗️ Architecture & Project Structure

### Core Principles

- **Feature-Driven Architecture**: Group files by feature, not by technical type (e.g., group components, hooks, and tests for an "auth" feature together).
- **File-Based Routing**: Use TanStack Router's directory structure for routing. Keep routes clean; delegate UI logic to feature components.
- **Separation of Concerns**: Keep UI presentation separate from business logic. Use Zustand for global UI/application state, and custom hooks for local state or data fetching.
- **Strict Type Safety**: Write comprehensive TypeScript types/interfaces for all data structures, store states, and API responses. Do not use `any`.

### Directory Layout

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Global reusable UI components (Buttons, Inputs, Modals)
├── config/          # Environment variables, constants, API clients
├── features/        # Feature modules (Feature-driven)
│   └── auth/
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── services/    # Feature-specific API calls
│       └── index.ts     # Public API for the feature
├── hooks/           # Global reusable React hooks
├── routes/          # TanStack Router file-based routes directory
│   ├── __root.tsx   # Root layout and global context providers
│   ├── index.tsx    # Home route (/)
│   └── auth.tsx     # Auth layout or route
├── store/           # Global state management (Zustand)
│   └── useUiStore.ts # Centralized slice-based or atomic Zustand stores
├── utils/           # Global helper functions
├── main.tsx         # Application entry point
└── routeTree.gen.ts # Automatically generated TanStack route tree
```

---

## 🔧 State Management & Routing Rules

### 🐻 Zustand (Global State)

- **Atomic/Slice Pattern**: Split large stores into logical slices. Maintain a clear separation between domain data and UI state.
- **Immutability**: Rely on Zustand's default immutable updates. Do not mutate state directly. Use Immer middleware if updating complex nested structures.
- **Selector Usage**: Always use specific selectors when consuming state in components (e.g., `const user = useAuthStore((s) => s.user)`) to prevent unnecessary re-renders. Do not destructure the entire store object.

### 🧭 TanStack Router (Routing)

- **Type-Safe Navigation**: Always use the type-safe `<Link>` component or `useNavigate()` hook. Pass search parameters using the type-safe `search` property.
- **Loaders for Data Fetching**: Use route `loader` functions to pre-fetch critical data before a route renders. Handle loading states via TanStack's built-in pending components.
- **Error Boundaries**: Define `errorComponent` and `notFoundComponent` handlers at the route level to handle errors gracefully.

---

## 🎨 Tailwind CSS Styles & UI

- **Utility-First**: Use Tailwind utility classes directly in the components. Avoid custom CSS files or inline style tags.
- **Component Extraction**: Extract repetitive Tailwind patterns into reusable React components, not via `@apply` in CSS files.
- **Responsive Design**: Use mobile-first design. Write base classes for mobile, then layer `sm:`, `md:`, `lg:`, and `xl:` modifiers.
- **Dynamic Classes**: Avoid dynamic string interpolation for Tailwind classes (e.g., `text-${color}-500`). Use full class names in ternary operators or lookups so the Tailwind compiler can discover them.
- **Class Ordering**: Let the Prettier Tailwind plugin automatically sort classes. If manual, follow: Layout → Box Model → Typography → Backgrounds → Effects.

---

## 🧪 Testing Strategy

### 🃏 Jest & React Testing Library (Unit & Integration)

- **File Naming**: Place tests in the same folder as the file being tested. Use `[name].test.tsx`.
- **Testing Behavior**: Test what the user sees and interacts with, not implementation details (do not test internal component state or Zustand store implementation details).
- **Queries**: Use `screen.getByRole` as the primary query choice. Avoid querying by container or implementation test IDs unless necessary.
- **Mocking Stores**: Reset Zustand store states before each test run using a `beforeEach` block to ensure test isolation.

### 🎭 Playwright (End-to-End Testing)

- **File Naming**: Place E2E tests in a dedicated root-level `tests/` directory. Use `[name].spec.ts`.
- **Locators**: Use user-facing attributes like `page.getByRole()` or `page.getByText()`. Use explicit `data-testid` attributes only when semantic queries are impossible.
- **Router Navigation**: When asserting navigation, wait for the URL or specific layout elements to change to confirm TanStack Router transitions are complete.
- **Isolation**: Ensure tests run in complete isolation. Avoid hardcoded `page.waitForTimeout()`.

---

## 🧹 Code Quality, ESLint & Prettier

### Code Style Rules

- Use functional components with arrow syntax (`const MyComponent = () => {}`).
- Destructure props directly in the component definition.
- Always provide a unique, stable `key` prop when rendering lists (never use the array index).

### ESLint & Prettier Enforcement

- **Strict Type Safety**: ESLint must enforce `@typescript-eslint/no-explicit-any: "error"` and `@typescript-eslint/explicit-module-boundary-types: "off"`.
- **Hooks Rules**: Strictly enforce React Hooks rules (`react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps`).
- **Prettier Integration**: Run Prettier as an ESLint rule via `eslint-plugin-prettier`. Code formatting errors must register as build-breaking lint errors.
- **Tailwind Sorting**: Enable `prettier-plugin-tailwindcss` to automatically organize utility class order on every file save.
- **Import Sorting**: Enforce consistent import order using an ESLint sorting plugin (e.g., React/built-ins → Third-party libraries → Internal aliases `@/*` → Relative imports → Styles).
