# Hytale Server Development

This guide covers the core aspects of server-side programming for Hytale, including Commands, Events, and the Entity Component System (ECS).

## Commands

Commands are the primary way to interact with the server while in-game. To create a command, you extend `AbstractPlayerCommand` (for player-only commands) or implementing `Command` logic directly.

### AbstractPlayerCommand

Extending `AbstractPlayerCommand` simplifies command creation by handling the context check (ensuring the sender is a player).

```java
import com.hypixel.hytale.server.core.commands.info.CommandContext;
import com.hypixel.hytale.server.core.commands.info.AbstractPlayerCommand;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.entity.components.TransformComponent;

public class MyCommand extends AbstractPlayerCommand {
    
    public MyCommand() {
        super("mycommand", "Description of my command");
    }

    @Override
    protected void execute(CommandContext ctx, Store<EntityStore> store, Ref<EntityStore> playerRef, World world) {
        // Access components primarily via the Store
        TransformComponent transform = store.getComponent(playerRef, TransformComponent.getComponentType());
        
        ctx.sendMessage(Message.raw("Your position: " + transform.getPosition()));
    }
}
```

### Components & Stores

- **Store**: The central data reservoir. You pass Entity References (`Ref`) to the Store to get data.
- **Ref**: A lightweight pointer to an entity.
- **Component**: Data containers (e.g., `TransformComponent`, `PlayerComponent`, `UUIDComponent`).

### Registering Commands

Commands must be registered in your main plugin class (usually in a dedicated method or the `setup` phase).

```java
// In your MainPlugin class
this.getCommandRegistry().registerCommand(new MyCommand());
```

## Events

Hytale uses an event-driven architecture. Events are separated into standard `IEvent`, `IAsyncEvent`, and `EcsEvent`.

### Standard Events

These run on the main thread and are safe for world modifications.

```java
public class MyEventListener {
    public static void onPlayerJoin(PlayerJoinEvent event) {
        // Handle logic
    }
}
```

### Async Events

`IAsyncEvent` events run on separate threads. **NEVER** modify the world or entities directly from an async event without scheduling a task on the main thread.

### ECS Events

ECS events are handled by `EntityEventSystem`. These are performance-critical and used for gameplay logic (damage, block breaking).

```java
class DamagePreventer extends EntityEventSystem<EntityStore, DamageEvent.Pre> {
    public DamagePreventer() {
        super(DamageEvent.Pre.class);
    }

    @Override
    public void handle(...) {
        // Logic here
    }
}
```

## Server-First Architecture

Hytale is "Server-First". This means:

- The Client is a "dumb terminal". It only renders what the server tells it to.
- You cannot trust client input.
- All game logic (movement, inventory, crafting) happens on the server.
- **Client-Side Prediction**: The client simulates actions (like moving) instantly, but if the server disagrees, the client is "corrected" (rubber-banding).

### Implications

- **Anti-Cheat**: Built-in by design.
- **Latency**: Code needs to account for network delay.
- **Security**: Never put sensitive logic (like "is this password correct") on a client UI that sends a packet.
