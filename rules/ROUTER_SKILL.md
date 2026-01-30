---
name: global-context
description: The Master Router (The Brain). Use this skill FIRST to find the correct specialized skill, GDD, or workflow for any task. Do not assume; consult the map.
---

# 🧠 Global Knowledge Router (The Brain)

> **CORE DIRECTIVE**: This is the **INDEX**. It does not contain the code. It contains the **LOCATION** of the code.
> **RULE**: When in doubt, strictly identifying the category of the user's request and load the corresponding specialized skill.

## 🗺️ Navigation Protocol

1. **Analyze Request**: Identify the domain (e.g., "Fix database lock" -> Backend/Database).
2. **Consult Map**: Find the relevant skill in the [Domain Map](#-domain-map) below.
3. **Load Skill**: Use `view_file` on the `SKILL.md` of the valid target.
    * *Example*: `view_file .agent/skills/database-design/SKILL.md`

---

## 📍 Domain Map

### 🎨 Frontend & Visual Experiences

*Creating interfaces, animations, and client-side logic.*

| Skill Name | Focus Area | when to use |
| :--- | :--- | :--- |
| `ui-ux-pro-max` | **Master Design** | Complete UI/UX reference, palettes, fonts, components. |
| `frontend-design` | **Principles** | Framework-agnostic design thinking (Color, Layout, Typography). |
| `building-advanced-visual-websites` | **High-End 3D/GL** | Three.js, WebGPU, Shaders, "Awwwards" style sites. |
| `react-patterns` | **React** | Hooks, Context, Component Composition, Performance. |
| `tailwind-patterns` | **Styling** | Tailwind v4, tricks, design tokens integration. |
| `building-mobile-apps` | **Mobile (App)** | React Native, Expo, Native Modules. |
| `mobile-design` | **Mobile (UX)** | Touch targets, mobile-first workflows, gestures. |
| `hosting-vite` | **Build Tool** | Vite configuration, bundling, fast dev server. |
| `prototyping-lovable` | **Rapid Proto** | Using Lovable.AI for instant UI generation. |
| `using-noesis-gui` | **Game UI** | XAML based UI for games (Unity/Unreal/Hytale). |
| `nextjs-best-practices` | **Next.js** | App Router, SSR/RSC, Next-specific patterns. |

### ⚙️ Backend, Architecture & Data

*Server logic, databases, and system design.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `architecture` | **Decisions** | Trade-offs, ADRs, System Design (Monolith vs Microservices). |
| `nodejs-best-practices` | **Runtime** | Node.js internals, async/await patterns, event loop. |
| `nestjs-expert` | **Framework** | Enterprise backend, Modules, Guards, Dependency Injection. |
| `api-patterns` | **Communication** | REST, GraphQL, tRPC, Error Handling, Versioning. |
| `database-design` | **Schema** | SQL vs NoSQL, Normalization, Indexing strategies. |
| `prisma-expert` | **ORM** | Schema.prisma, migrations, type-safe queries. |
| `server-management` | **Ops/Sysadmin** | Process management (PM2), logs, scaling. |
| `python-patterns` | **Python** | Pythonic code, Django/FastAPI patterns. |
| `typescript-expert` | **Language** | Advanced Types, Generics, Compiler Options. |
| `using-bun` | **Runtime** | Fast JS runtime, package manager, test runner. |

### 🚀 DevOps, Infrastructure & Security

*Deploying, securing, and maintaining systems.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `docker-expert` | **Containers** | Dockerfiles, Compose, Multi-stage builds. |
| `using-docker` | **Usage** | Basic usage of Docker in projects. |
| `deploying-vercel` | **Platform** | Vercel specific deployment, Edge Functions. |
| `managing-supabase` | **BaaS** | Supabase Auth, DB, Edge Functions, Storage. |
| `automating-github-actions` | **CI/CD** | Pipelines, workflows, automation. |
| `deployment-procedures` | **Strategy** | Theory of deployment (Blue/Green, Rollbacks). |
| `vulnerability-scanner` | **Security** | Auditing, OWASP, Supply Chain attacks. |
| `red-team-tactics` | **Offense** | Thinking like an attacker to secure systems. |
| `bash-linux` | **OS** | CLI mastery, scripting, permissions (Unix). |
| `powershell-windows` | **OS** | Windows specific scripting and commands. |

### 🎮 Game Development & Modding

*Creating interactive worlds and modifying games.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `game-development` | **General** | Game loop, physics, math for games. |
| `modding-hytale` | **Hytale** | Hytale specific modding API, Kwik, Java. |
| `modding-fivem-qbcore` | **GTA V** | FiveM server scripting, Lua, QBCore framework. |

### 🤖 AI, Agents & Automation

*Integrating intelligence and agentic behaviors.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `integrating-ai` | **LLM Integration** | Vercel AI SDK, OpenAI API, LangChain concepts. |
| `mcp-builder` | **Protocol** | Building MCP servers (Tools, Resources). |
| `parallel-agents` | **Orchestration** | Managing multiple sub-agents/threads. |
| `behavioral-modes` | **Metacognition** | Adjusting agent persona (Debug vs Architect). |
| `brainstorming` | **Process** | Techniques for idea generation and refinement. |
| `geo-fundamentals` | **Optimization** | Generative Engine Optimization settings. |

### ✅ Process, Quality & Testing

*Ensuring code works and is maintainable.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `app-builder` | **Scaffolding** | Starting new projects from scratch. |
| `plan-writing` | **Planning** | Creating robust implementation plans. |
| `clean-code` | **Standards** | Readability, naming conventions, refactoring. |
| `code-review-checklist` | **Audit** | Reviewing Pull Requests and code quality. |
| `documentation-templates` | **Docs** | Writing READMEs, ADRs, and technical guides. |
| `testing-patterns` | **Strategy** | Unit vs Integration vs E2E philosophy. |
| `testing-apps` | **Setup** | Configuring Vitest, Jest, Playwright. |
| `webapp-testing` | **Web Specific** | Testing web flows and interactions. |
| `tdd-workflow` | **Methodology** | Test Driven Development cycle. |
| `systematic-debugging` | **Troubleshooting** | The "Wolf Fence" algorithm for bug fixing. |
| `performance-profiling` | **Speed** | Measuring and improving runtime performance. |
| `lint-and-validate` | **Static Analysis** | ESLint, Prettier, Husky setup. |
| `i18n-localization` | **Global** | Translating apps, managing locales. |

### 🆔 Identity & Brand

*Voice, Tone, and SEO.*

| Skill Name | Focus Area | When to use |
| :--- | :--- | :--- |
| `viccs-brand-2025-identity` | **Personal Brand** | **PRIMARY** source for Paulo Vinicios's brand. |
| `brand-identity` | **General** | General branding principles. |
| `seo-fundamentals` | **Search** | Ranking, meta tags, sitemaps. |

---

## 📚 Global Design Documents (GDD)

The Master Vision and core definitions are stored in `.agent/gdd`.
Use `list_dir .agent/gdd` to see available context docs.

**Key Files:**

* `vision.md`: The high-level purpose of the project.
* `style_guide.md`: Visual verification.
* `mechanics.md`: (If Game) Game rules and loops.

## ⚡ Workflows

Standard Operating Procedures (SOPs) are in `.agent/workflows`.
These are step-by-step recipes for common tasks.

**Common Workflows:**

* Use `list_dir .agent/workflows` to find recipes like "Deploy to Vercel" or "Set up Monorepo".

---

## 🛑 Fallback Protocol

If you cannot find a matching skill in the map above:

1. Run `list_dir .agent/skills` to check if a new skill was added recently.
2. If still not found, fallback to general knowledge but **flag this gap** to the user so we can create a new skill.
