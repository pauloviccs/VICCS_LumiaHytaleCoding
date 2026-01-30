---
name: testing-apps
description: Configures Vitest for unit testing and Playwright for End-to-End (E2E) testing. Use when the user wants to test React components, verify user flows, or set up a test runner.
---

# Testing Applications (Vitest & Playwright)

## When to use this skill

- When the user asks to "add tests", "setup testing", or "verify code".
- When the user mentions "unit tests", "integration tests", or "e2e".
- When working with React/Next.js/Vite components.

## Workflow

1. **Unit Testing (Vitest)**:
    - Install: `npm install -D vitest @testing-library/react jsdom`
    - Configure: `vite.config.ts` (add `test` object).
    - Run: `npm test` or `npx vitest`.
2. **E2E Testing (Playwright)**:
    - Install: `npm init playwright@latest`
    - Run: `npx playwright test`.
    - UI Mode: `npx playwright test --ui`.

## Instructions

### Vitest Setup (Unit/Component)

Use for testing functions, hooks, and individual components.
**`vite.config.ts`**:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
})
```

**Example Test (`Button.test.tsx`)**:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeDefined();
});
```

### Playwright Setup (E2E)

Use for testing full page flows (login, navigation, payment).
**Example Test (`tests/example.spec.ts`)**:

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/My App/);
});

test('can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
