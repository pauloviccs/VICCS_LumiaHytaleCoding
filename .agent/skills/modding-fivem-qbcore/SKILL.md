---
name: modding-fivem-qbcore
description: Guides the creation of scripts, resources, and server management for FiveM using the QBCore framework. Use when the user asks about GTA V RP servers, FiveM scripts (Lua), QBCore exports, or creating UI (NUI) for FiveM.
---

# Modding FiveM (QBCore Framework)

## When to use this skill

- When the user asks to create or modify a **FiveM resource** (`fxmanifest.lua`).
- When the user mentions **QBCore**, "city scripts", or RP framework logic.
- When working with **Lua** scripts for GTA V.
- When creating NUI (HTML/CSS/JS interfaces) for FiveM.

## Workflow

1. **Resource Creation**:
    - Create folder `[script-name]`.
    - Create `fxmanifest.lua` (The manifest file).
    - Create `client/main.lua` and `server/main.lua`.
2. **QBCore Initialization**:
    - In `client/main.lua` & `server/main.lua`, retrieve the core object:

        ```lua
        local QBCore = exports['qb-core']:GetCoreObject()
        ```

3. **Event Handling**:
    - Listen for QBCore events (e.g., `QBCore:Client:OnPlayerLoaded`).
    - Register network events (`RegisterNetEvent`, `TriggerServerEvent`).
4. **UI Development (NUI)**:
    - Use `SendNUIMessage` (Lua) -> `window.addEventListener('message')` (JS).
    - Use `fetch` (`https://resource-name/callback`) to send data back to Lua.

## Instructions

### 1. `fxmanifest.lua` Standard

```lua
fx_version 'cerulean'
game 'gta5'

description 'My QBCore Script'
version '1.0.0'

shared_scripts { 'config.lua' }
client_scripts { 'client/main.lua' }
server_scripts { 'server/main.lua' }
```

### 2. Client-Side Pattern (Lua)

- **Natives**: Use [FiveM Natives](https://docs.fivem.net/natives/) for game logic (spawning cars, drawing markers).
- **QBCore**: Use `QBCore.Functions.Notify('Message', 'success')` for UI feedback.
- **Threads**: Use `CreateThread(function() ... end)` for loops (like drawing markers every frame).

### 3. Server-Side Pattern (Lua)

- **Database**: Use `oxmysql` (standard for QBCore) for SQL queries.

    ```lua
    MySQL.query('SELECT * FROM players WHERE citizenid = ?', {cid}, function(result) ... end)
    ```

- **Items**: `xPlayer.Functions.AddItem('item_name', 1)`

### 4. NUI (HTML/CSS/React)

- Scripts can open a web browser overlay.
- **Show**: `SetNuiFocus(true, true)`
- **Hide**: `SetNuiFocus(false, false)`

## Resources

- [FiveM Native Reference](https://docs.fivem.net/natives/)
- [QBCore Documentation](https://docs.qbcore.org/qbcore-documentation)
- [Cfx.re Cookbook](https://docs.fivem.net/docs/cookbook/)
