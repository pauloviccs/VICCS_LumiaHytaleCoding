# Assets & Client Development

## Asset Pipeline: Blockbench & Hytale Modeler

Hytale enforces a strict voxel-based art style.

- **Primitives**: You allow **Cubes** (6 faces) and **Quads** (2 faces).
- **Forbidden**: Spheres, cylinders, ngons, or high-poly meshes.
- **Grid**: Everything must snap to the global pixel grid.

### Texture Density Rules

- **Blocks/Props**: 32 pixels per block unit.
- **Characters/Items**: 64 pixels per block unit.
- **Reason**: Maintaining consistent pixel density prevents the "HD Texture Pack on low-poly model" look which looks jarring.

## UI Customization

Hytale's UI is transitioning towards **NoesisGUI** (XAML-based), but currently supports a mix.

### Control Flow

1. **Server**: Sends UI Data (Layout Asset + initial state) -> Client.
2. **Client**: Renders UI.
3. **User**: Clicks Button -> Client sends interaction packet -> Server.
4. **Server**: Executes logic -> Sends update packet -> Client re-renders.

**Latency Warning**: All UI logic happens on the server. Design UIs that feel responsive even with 50-100ms ping. Avoid "drag and drop" interfaces that require server confirmation for every pixel of movement.

### Frameworks

- **NoesisGUI (Future Standard)**: Uses XAML (like WPF). Powerful styling, animations, and vector graphics.
- **HyUI (Community)**: HTML-like interface (HYUIML). Easier for web developers. [See hyui_documentation.md](hyui_documentation.md).
- **Legacy Framework**: Uses custom markup. Deprecated.

### Code Example (Noesis / XAML Concept)

*Note: Specific syntax varies by version, check `NoesisGUI` docs.*

```xml
<Grid>
  <Button Content="Click Me" Click="OnButtonClick" />
</Grid>
```

The `OnButtonClick` would be bound to a Java method on the server side that handles the logic.

## Client-Side Modding

**Strictly Limited.**

- You cannot write custom client-side C# code (at the moment).
- All custom behavior must be server-side or data-driven (JSON assets, UI layouts, Scripts).
