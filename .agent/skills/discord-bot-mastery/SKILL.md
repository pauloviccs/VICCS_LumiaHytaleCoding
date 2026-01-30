---
name: discord-bot-mastery
description: Definitive guide for building Discord Bots, Embedded Apps (Activities), and Integrations. Covers Gateway vs HTTP Interactions, Discord.js, Python, and Monetization.
---

# Discord Bot Mastery & Integrations

> **"Build the Platform, not just the Bot."**

## When to use this skill

- When the user wants to create a **Discord Bot**, **Activity**, or **Integration**.
- When asked about "Slash Commands", "Buttons", "Modals", "Embedded Apps", or "Discord SDK".
- When improving engagement in Discord communities.

## Core Concepts (2025 Edition)

### 1. The Architecture Decision: Gateway vs. HTTP

| Feature | Gateway (WebSocket) | HTTP Interactions (Webhook) |
| :--- | :--- | :--- |
| **Real-time Events** | Yes (MessageCreate, VoiceStateUpdate) | No (Only replies to user actions) |
| **Cost/Scale** | High (Requires persistent servers/sharding) | **Low** (Serverless friendly - Vercel/Cloudflare) |
| **Use Case** | Music bots, Moderation logs, Leveling | Slash Commands, Dashboard interactions, Utilities |
| **Recommendation** | Use only if you *need* real-time events. | **Default choice** for modern apps. |

### 2. Tech Stack Selection

#### 🟢 JavaScript / TypeScript (Recommended)

- **Discord.js (v14+)**: The standard. Full coverage of API. Best for Gateway bots.
- **Hono / Itty-Router**: Best for **Serverless HTTP Interactions** (Cloudflare Workers). Ultra-fast.
- **Next.js**: Perfect for the support Dashboard + OAuth2 login.

#### 🔵 Python

- **Discord.py (2.0+)**: Robust, classic. Good for data-heavy bots.
- **Disnake**: Fork with rapid feature updates.

#### 🦀 Rust / Go

- **Twilight / Serenity**: For high-performance, massive-scale bots (1M+ servers).

---

## 🛠️ Building Interactive Apps (The "Vibe" Way)

### 1. UI Components (The "Frontend" of Discord)

Never use plain text commands (`!help`) anymore. Use **Interactions**.

- **Buttons**: Primary actions (Red/Green/Blue/Grey). Use for "Confirm", "Cancel", "Page Next".
- **Select Menus**: Dropdowns for Roles, Channels, or Users.
- **Modals**: Pop-up forms for data entry (Bug reports, Applications).

### 2. Embedded App SDK (Activities)

The future of Discord apps. Runs your web app **inside** Discord (iframe).

- **Tech**: HTML5, standard Web APIs (Canvas, WebGL).
- **SDK**: `@discord/embedded-app-sdk`.
- **Auth**: Seamless OAuth2 (Handshake happens instantly).
- **Use Cases**: Multiplayer Games, Whiteboards, Collaborative Coding, YouTube Watch Together.

### 3. Monetization (Premium Apps)

- **SKUs**: Define premium tiers in Developer Portal.
- **Entitlements**: Check `interaction.entitlements` to verify if user paid.
- **Rules**: Never sell "Pay-to-Win" or access to Discord core features.

---

## 🚀 Implementation Guides

### A. Serverless Slash Command (Cloudflare Workers)

*Fast, cheapest, scalable.*

1. **Repo**: `https://github.com/discord/cloudflare-sample-app`
2. **Verify Key**: Validate Ed25519 signature (Security requirement).
3. **Handle**: Receive `POST` -> Check Type -> Respond JSON.

### B. Stateful Gateway Bot (Discord.js)

*For Music, Moderation, Complex Logic.*

1. **Intents**: Enable only what you need (e.g., `GuildVoiceStates`).
2. **Sharding**: Mandatory for 2,500+ servers. Use `ShardingManager`.
3. **Database**: Use PostgreSQL/Prisma. Do NOT store data in JSON files.

### C. Embedded App (Activity)

1. **Frontend**: Vite + React/Vanilla.
2. **Config**: Set "URL Mapping" in Dev Portal.
3. **Code**:

    ```javascript
    import { DiscordSDK } from "@discord/embedded-app-sdk";
    const discordSdk = new DiscordSDK(CLIENT_ID);
    await discordSdk.ready(); // Auth handshake
    ```

---

## 📚 Resources

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API Docs](https://discord.com/developers/docs/intro)
- [Discord.js Guide](https://discordjs.guide/)
- [Discord Embedded App SDK](https://github.com/discord/embedded-app-sdk)
- [App Directory](https://discord.com/application-directory)

## ⚠️ Security Checklist

- [ ] **Token Safety**: Never commit `.env`.
- [ ] **Validation**: Verify all Interaction Signatures.
- [ ] **Permissions**: Check `member.permissions` related to the command action.
- [ ] **Rate Limiting**: Implement user-level cooldowns (Redis/KV).
