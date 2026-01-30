---
name: using-bun
description: Manages JavaScript/TypeScript projects using the Bun runtime, package manager, and bundler. Use when the user asks to use Bun, run typescript scripts directly, or optimize npm workflows.
---

# Using Bun

## When to use this skill
- When the user explicitly mentions "Bun".
- When the user wants to run TypeScript files directly without compilation.
- When the user wants faster package installation (replacing npm/yarn).
- When the user needs a fast test runner or bundler.
- When the user wants to use native APIs like `Bun.serve`, `Bun.file`, `Bun.write`.

## Workflow
1.  **Verify Installation**: Check if Bun is available.
    - `bun --version`
2.  **Initialize Project** (if new):
    - `bun init`
3.  **Manage Dependencies**:
    - Install: `bun install` (replaces `npm install`)
    - Add: `bun add <package>` (replaces `npm install <package>`)
    - Remove: `bun remove <package>`
4.  **Run Scripts/Files**:
    - Run file: `bun <file.ts/js>` (e.g., `bun index.ts`)
    - Run script: `bun run <script-name>`
    - Watch mode: `bun --hot <file.ts>`
5.  **Testing**:
    - Run tests: `bun test`
6.  **Building**:
    - Bundle: `bun build ./entry.ts --outdir ./out`

## Instructions
- **Runtime**: Bun runs `.ts` and `.tsx` files directly. No `tsc` needed for execution.
- **Package Manager**: Use `bun install` instead of `npm install`. It reads `package.json` and writes to `bun.lockb` (binary lockfile).
- **Test Runner**: `bun test` is a drop-in replacement for Jest. It supports `describe`, `test`, `expect` automatically.
- **Environment Variables**: Bun reads `.env` files automatically. Access via `process.env` or `Bun.env`.
- **Shell**: Use `Bun.$` for cross-platform shell scripting in JavaScript files.

## Resources
- [Bun Documentation](https://bun.com/docs)
- [Bun API](https://bun.com/docs/api/root)
