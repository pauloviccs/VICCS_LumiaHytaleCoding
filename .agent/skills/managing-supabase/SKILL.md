---
name: managing-supabase
description: Manages Supabase projects, including Database, Auth, Storage, and Edge Functions. Use when the user asks to configure Supabase, optimize costs, or troubleshoot Egress issues.
---

# Managing Supabase

## When to use this skill

- When the user asks to set up or configure a Supabase project.
- When the user needs help with Supabase Auth, Database, Storage, or Realtime.
- When the user asks about **Egress issues**, **high costs**, or **performance troubleshooting**.
- When the user wants to use Edge Functions or Postgres Modules (Vectors, Cron, etc.).

## Workflow

1. **Project Setup**:
    - Connect to the project using `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
    - Install the client library (e.g., `@supabase/supabase-js`).
2. **Feature Implementation**:
    - **Auth**: Configure providers in the dashboard, implement sign-in/sign-up logic.
    - **Database**: Design schemas, set up RLS (Row Level Security) policies.
    - **Storage**: Create buckets, set RLS, upload/download files.
3. **Optimization & Troubleshooting**:
    - Monitor usage (Egress, CPU, RAM) in the dashboard.
    - Analyze logs for slow queries or high-traffic paths.
    - Implement caching and optimization strategies.

## Instructions

### Core Features

- **Database**: Full Postgres. Use `supabase.from('table').select('*')` for basic queries. Always use RLS for security.
- **Auth**: Built-in support for Email/Password, Magic Links, OAuth (Google, GitHub, etc.), and SSO.
- **Storage**: S3-compatible object storage. Secure files with policies.
- **Edge Functions**: TypeScript functions (Deno-based) running closer to the user.
- **Realtime**: Subscribe to database changes (`INSERT`, `UPDATE`, `DELETE`) or broadcast events.

### 💰 Egress Optimization (Cost Reduction)

Egress (bandwidth) is often the highest cost driver. Follow these rules to minimize it:

1. **Select Specific Fields**: NEVER use `select('*')` in production unless absolutely necessary.
    - *Bad:* `const { data } = await supabase.from('users').select('*')`
    - *Good:* `const { data } = await supabase.from('users').select('id, username')`
2. **Use Caching**:
    - Use libraries like [`supabase-cache-helpers`](https://github.com/psteinroe/supabase-cache-helpers/) to cache SWR/React Query responses.
    - Enable **Smart CDN** for Storage to serve assets from the edge (cheaper cached egress).
3. **Optimize Mutations**:
    - By default, `insert` and `update` may return the modified row. If you don't need it, don't ask for it.
4. **Image Optimization**:
    - Use [Supabase Image Transformations](https://supabase.com/docs/guides/storage/image-transformations) to resize and compress images before serving them.
    - Serving a 5MB image when a 50kb thumbnail works is a major egress leak.
5. **Log Analysis**:
    - Go to **Log Explorer -> Top Paths** to see what API routes are consuming bandwidth.
    - Use **Query Performance Advisors** to identify queries returning large numbers of rows.
    - *Note:* Supavisor (Connection Pooler) egress acts independently. If you pull 1MB to an Edge Function but return 100KB to the user, you pay for both legs.

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Egress Troubleshooting Guide](https://supabase.com/docs/guides/troubleshooting/all-about-supabase-egress-a_Sg_e)
