---
name: hosting-vite
description: Manages the setup, development, and building of Vite projects for web applications. Use when the user asks to start a new frontend project, configure a build application, or host static sites.
---

# Hosting & Using Vite

## When to use this skill

- When the user wants to start a new frontend project (React, Vue, Svelte, etc.).
- When the user mentions "Vite", "dev server", or "bundling".
- When the user needs to build a project for production (`npm run build`).

## Workflow

1. **Scaffold Project**:
    - Use `npm create vite@latest` to start the interactive setup.
    - Select framework (React, Vue, Vanilla, etc.) and variant (TypeScript recommended).
    - Alternatively: `npm create vite@latest my-app -- --template react-ts` for one-line setup.
2. **Development**:
    - `npm install`: Install dependencies.
    - `npm run dev`: Start the dev server (default port 5173).
    - **Features**: Hot Module Replacement (HMR) is active by default.
3. **Configuration**:
    - Edit `vite.config.ts` for plugins, aliases, and build settings.
4. **Production Build**:
    - `npm run build`: Bundles the app into `dist/`.
    - `npm run preview`: Preview the production build locally.

## Instructions

- **Entry Point**: `index.html` is the entry point and must reside in the project root. It should reference your main JS/TS file: `<script type="module" src="/src/main.tsx"></script>`.
- **Static Assets**: Place static files (robots.txt, favicon) in the `public/` directory. They will be copied to `dist/` root on build.
- **Environment Variables**: Use `.env` files. Variables must start with `VITE_` to be exposed to the client (e.g., `VITE_API_URL`). Access via `import.meta.env.VITE_API_URL`.
- **CSS**: Import CSS directly in JS files. Vite handles pre-processors (Sass, Less) if you install them (e.g., `npm add -D sass`).

## CLI Cheatsheet

- `vite`: Start dev server.
- `vite build`: Build for production.
- `vite preview`: Serve the `dist` folder.
- `vite --port 3000`: Specify custom port.

## Resources

- [Vite Documentation](https://vite.dev/guide/)
- [Configuring Vite](https://vite.dev/config/)
