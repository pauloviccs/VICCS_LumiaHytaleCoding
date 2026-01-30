---
name: prototyping-lovable
description: Guides rapid prototyping using Lovable.AI. Use when the user wants to generate apps quickly, integrate Supabase via Lovable, or follows "Frontend First" workflows.
---

# Prototyping with Lovable.AI

## When to use this skill

- When the user mentions "Lovable", "Lovable.dev", or "Generative UI".
- When the goal is **rapid prototyping** or MVP creation.
- When working with the specific "Lovable Stack" (React + Tailwind + file-based routing + Supabase).
- When debugging Lovable-generated code.

## Workflow

1. **Prompt Engineering (The "Lovable Way")**:
    - **Context**: Start with a Knowledge File (product vision, user roles).
    - **Specificity**: Define specific pages (e.g., "Create a dashboard at `/dashboard`").
    - **Incremental**: Build one feature at a time. Validate before moving on.
2. **Database Integration**:
    - Use **Lovable Core** for built-in database needs (mock data first).
    - Connect **Supabase** when logic is solidified.
    - **Security**: NEVER hardcode API keys. Use Lovable's "Secrets" manager.
3. **Refining UI**:
    - Use "Visual Edit" mode for small tweaks (padding, colors).
    - Use Chat Mode for logic changes ("Make this button trigger a Supabase insert").

## Instructions

### 1. Best Practices for Prompts

- **Role Definition**: "Acting as an Admin, I need to see..."
- **Guardrails**: "Do not modify the `Layout.tsx` file."
- **Visuals**: Upload screenshots of the desired vibe or bug reports.

### 2. Project Structure (Standard Lovable)

Lovable projects typically follow this structure:

```
/src
  /components    # Shadcn UI + Custom Components
  /pages         # Route pages (Index, Dashboard, Login)
  /hooks         # Custom hooks (use-toast, use-mobile)
  /integrations  # Supabase client & React Query keys
```

### 3. Data Integration (Supabase)

- **Frontend First**: Start with mock data:

    ```tsx
    const MOCK_DATA = [{ id: 1, name: 'Item A' }];
    ```

- **Backend Switch**: Ask Lovable: "Refactor this component to fetch data from the 'items' table in Supabase."
- **RLS Policies**: Always verify Row Level Security policies in Supabase console after generation.

### 4. Troubleshooting generated code

- **"Hallucinated" Imports**: Check if the component actually exists in `/components`.
- **Tailwind Conflicts**: Lovable handles `tailwind.config.ts` automatically, but avoid manual overrides unless necessary.

## Resources

- [Lovable Documentation](https://lovable.dev/)
- [Supabase Integration Guide](https://lovable.dev/supa)
