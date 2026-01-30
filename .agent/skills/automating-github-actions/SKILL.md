---
name: automating-github-actions
description: Automates workflows using GitHub Actions for CI/CD, testing, linting, and deployment. Use when the user asks to "set up a pipeline", "run tests on push", or "deploy automatically".
---

# Automating with GitHub Actions

## When to use this skill

- When the user asks to setup CI/CD pipeline.
- When the user wants to run tests, linting, or build steps on every commit/PR.
- When the user wants to deploy to Vercel, Docker Hub, or other platforms automatically.
- When the user asks about `.github/workflows`.

## Workflow

1. **Workflow Creation**:
    - Create `.github/workflows/main.yml`.
    - Define `on:` triggers (push, pull_request, schedule).
    - Define `jobs:` (build, test, deploy).
2. **Job Steps**:
    - Checkout code: `- uses: actions/checkout@v4`
    - Setup environment: `- uses: actions/setup-node@v4` (or python/go/java).
    - Install dependencies: `npm ci` (clean install).
    - Run scripts: `npm test`, `npm run build`.
3. **Secrets Management**:
    - Store sensitive data in Repo Settings > Secrets and Variables > Actions.
    - Access via `${{ secrets.MY_SECRET }}`.

## Instructions

### Basic Node.js CI Workflow

```yaml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

### Deployment (e.g., to Vercel)

```yaml
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Scheduled Cron Job

```yaml
on:
  schedule:
    - cron: '0 0 * * *' # Every day at midnight
```

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions)
