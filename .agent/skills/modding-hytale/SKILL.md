---
name: modding-hytale
description: Guides the creation of Hytale mods using Java (Server), NoesisGUI (UI), HyUI (HTML UI), and World Gen V2. Acts as a hub for detailed server, asset, and generation guides.
---

# Modding Hytale

## When to use this skill

- When the user asks to create a Hytale mod, plugin, or server script.
- When the user mentions "Hytale", "Prefabs", "ECS", "Server", "Blockbench", "World Gen V2", "HyUI", or "HTML UI".
- When creating custom entities, blocks, or modifying world generation logic.

## Workflow

1. **Determine the Domain**:
    - **Server Logic** (Commands, Events, Entities) -> [See server_development.md](resources/server_development.md)
    - **World Generation** (Biomes, Noise, Density) -> [See world_generation.md](resources/world_generation.md)
    - **Assets & UI** (Models, Textures, NoesisGUI, HyUI) -> [See assets_and_client.md](resources/assets_and_client.md) or [See hyui_documentation.md](resources/hyui_documentation.md)

2. **Environment Check & Setup**:
    - **Java 25** (OpenJDK/Adoptium) + **Maven 3.9.12+**.
    - Install `HytaleServer.jar` to local Maven cache.
    - **NEW**: Configure `gradle.properties` if using custom paths.

3. **Execute Logic**:
    - Follow the specific patterns in the linked resource files.
    - Use "Server-First" thinking: assume the client is just a screen, all logic is on the server.

## Instructions

### 1. Environment Setup (Critical)

- **Java**: JDK 25 (Adoptium recommended).
- **Maven**: 3.9.12+.
- **HytaleServer.jar**: Must be manually installed.

**PowerShell Install Command:**

```powershell
mvn install:install-file -Dfile="PATH_TO_JAR/HytaleServer.jar" -DgroupId="com.hypixel.hytale" -DartifactId="HytaleServer-parent" -Dversion="1.0-SNAPSHOT" -Dpackaging="jar"
```

**Custom Game Location (`gradle.properties`):**
If your Hytale installation is non-standard, create `%USERPROFILE%/.gradle/gradle.properties`:

```properties
hytale.install_dir=path/to/Hytale
# Optional: Speed up decompilation
hytale.decompile_partial=true
```

### 2. Event System Architecture

Hytale distinguishes between Synchronous, Asynchronous, and ECS events.

| Event Type | Interface | Usage | Examples |
| :--- | :--- | :--- | :--- |
| **Sync** | `IEvent` | Main thread. Safe to modify world/entities. | `PlayerReadyEvent`, `EntityRemoveEvent`, `AddWorldEvent` |
| **Async** | `IAsyncEvent` | Separate thread. **Read-only** access to world. | `PlayerChatEvent`, `AssetEditorFetchAutoCompleteDataEvent` |
| **ECS** | `EcsEvent` | Entity Component System interactions. | `BreakBlockEvent`, `PlaceBlockEvent`, `DamageBlockEvent` |

**Critical**: Never modify world state inside an `IAsyncEvent`.

### 3. Prefab Workflow (Building Structures)

Prefabs are structures created in-game and saved as assets.

1. **Create Editing World**: `/editprefab new <world_name>`
2. **Build**: Construct your structure.
3. **Select**: Use the Selection Brush to define bounds.
4. **Save**: `/prefab save` (Saves to file system).
5. **Exit**: `/editprefab exit`.
6. **Load/Test**: `/prefab load` to spawn it in a normal world.

### 4. Quick References

#### Server & ECS

- **Entity**: `com.hypixel.hytale.server.core.entity.Entity`
- **World**: `com.hypixel.hytale.server.core.universe.world.World`
- **Player**: `com.hypixel.hytale.server.core.entity.entities.Player`
- **Command Context**: `com.hypixel.hytale.server.core.commands.info.CommandContext`

#### Common Pitfalls

- **Spawning Entities**: Do NOT use `new Entity()`. Use `PrefabSpawnerModule` or `EntityModule`.
- **Async Events**: Do NOT modify the world in `IAsyncEvent`.
- **UI Latency**: UI interactions make a round-trip to the server. Design accordingly.
- **Gradle Refresh**: Always refresh Gradle after changing `gradle.properties` or `build.gradle`.

## Resources

- [Server Development Guide](resources/server_development.md)
- [World Generation Guide](resources/world_generation.md)
- [Assets & Client Guide](resources/assets_and_client.md)
- [HyUI Documentation (HTML UI)](resources/hyui_documentation.md)
- [Official Hytale Modding Docs](https://hytalemodding.dev/en/docs)
- [Example Plugin Repo](https://github.com/Kaupenjoe/Hytale-Example-Plugin)
