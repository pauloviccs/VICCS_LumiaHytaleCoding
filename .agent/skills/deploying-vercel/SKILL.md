---
name: deploying-vercel
description: Manages deployments, project configuration, and serverless functions on Vercel. Use when the user wants to deploy a web app, configure routes/rewrites, or manage Vercel environments.
---

# Deploying on Vercel

## When to use this skill

- When the user mentions "Vercel", "deployment", or "hosting" (for web apps).
- When the user asks to "ship it", "go live", or "publish" a Next.js/React/Vue/Vite app.
- When configuring `vercel.json` (rewrites, headers, redirects).
- When setting up Vercel Functions (Edge or Serverless).

## Workflow

1. **Installation & Login**:
    - `npm i -g vercel`
    - `vercel login`
2. **Deployment**:
    - **Preview**: Run `vercel` in the project root to deploy a preview URL.
    - **Production**: Run `vercel --prod` to deploy to the production domain.
    - **Git Integration**: Push to the connected Git branch (e.g., `main`) for automatic deployment.
3. **Project Configuration**:
    - Use `vercel link` to link a local folder to a Vercel project.
    - Use `vercel env pull` to download environment variables to `.env.local`.
4. **Local Development**:
    - `vercel dev` replicates the Vercel environment locally (including Serverless Functions).

## Instructions

### Project Structure (Vite/Static)

Vercel automatically detects most frameworks. For strict control, ensure your `package.json` has a `build` script (e.g., `vite build`).

### `vercel.json` Configuration

Use this file for routing and caching headers.

```json
{
  "rewrites": [
    { "source": "/api/:match*", "destination": "https://api.backend.com/:match*" },
    { "source": "/(.*)", "destination": "/index.html" } 
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

*Note: For single-page apps (SPA) like Vite/React, the rewrite to `/index.html` is crucial if not using the default framework output.*

### Serverless Functions

- Place files in `api/`:
  - `api/hello.js` -> mapped to `/api/hello`
- **Edge Functions**:
  - Use `export const config = { runtime: 'edge' };` in your function file.

### Environment Variables

- Manage via Dashboard: **Settings > Environment Variables**.
- **Important**: Do not commit `.env` files. Use `vercel env pull` to get them locally.

## Troubleshooting

- **Build Fails**: Check `npm run build` locally first.
- **404 on Routes**: Ensure SPAs have a rewrite to `/index.html`.
- **CORS Issues**: Add CORS headers in `vercel.json` or your API function.

## Resources

- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Project Configuration (vercel.json)](https://vercel.com/docs/project-configuration)
- [Functions Overview](https://vercel.com/docs/functions)
