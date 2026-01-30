# HyUI: HTML-based Interface for Hytale

HyUI is a library that allows you to build Hytale User Interfaces using an HTML-like markup language called **HYUIML** (HyUI Markup Language). It simplifies UI development by allowing familiar web-dev patterns.

> **Note**: HyUI is a community library and an alternative to the official NoesisGUI (XAML) framework.

## 1. Getting Started

### HyUI Markup Language (HYUIML)

HYUIML files use the `.xml` or custom extensions, but structured like HTML.

- **Root Element**: Usually a `<div>` or specific container.
- **Styling**: Supports embedded `<style>` blocks and inline `style` attributes.

### Java Integration

To open a UI for a player:

```java
// Load from file (recommended)
PageBuilder.pageForPlayer(playerRef)
    .fromFile("Common/UI/Custom/my_ui.xml")
    .open(store);

// Or build programmatically
LabelBuilder label = LabelBuilder.label().withText("Hello World");
PageBuilder.pageForPlayer(playerRef).addElement(label).open(store);
```

## 2. Supported Elements

| Element | Builder Class | Description |
| :--- | :--- | :--- |
| `<div>` | `DivBuilder` | Container for layout. |
| `<p>`, `<span>` | `LabelBuilder` | Text labels. |
| `<button>` | `ButtonBuilder` | Standard buttons. |
| `<input type="text">` | `TextFieldBuilder` | Text input. |
| `<input type="number">` | `NumberFieldBuilder` | Numeric input. |
| `<input type="range">` | `SliderBuilder` | Sliders. |
| `<input type="checkbox">` | `CheckBoxBuilder` | Toggle switches. |
| `<input type="color">` | `ColorPickerBuilder` | Color selectors. |
| `<img src="...">` | `ImageBuilder` | Displays an image. |
| `<select>` | `DropdownBoxBuilder` | Dropdown lists (use `<option>` for items). |
| `<nav>` | `TabNavigationBuilder` | Tab bar container. |
| `<progress>` | `ProgressBarBuilder` | Progress bars. |
| `<item-icon>` | `ItemIconBuilder` | Displays an item icon (`data-hyui-item-id`). |
| `<item-slot>` | `ItemSlotBuilder` | Interactive item slot. |
| `<item-grid>` | `ItemGridBuilder` | Grid container for slots. |
| `<sprite>` | `SpriteBuilder` | Animated sprite. |

## 3. Common Attributes

- **Functional**: `id`, `class`, `value`, `min`, `max`, `step`, `checked`, `placeholder`.
- **HyUI Specific**:
  - `data-hyui-title`: Set header title for containers.
  - `data-hyui-tooltiptext`: Tooltip text.
  - `data-hyui-item-id`: Item ID (e.g., `Tool_Pickaxe_Crude`).
  - `data-tabs`: Define tabs in format `id:Label,id2:Label2`.
  - `data-hyui-tab-id`: Link content to a tab ID.

## 4. Styling (CSS-like)

You can use standard CSS properties in `<style>` blocks or `style="..."` attributes.

```css
#my-button {
    color: #FFFFFF;
    background-color: #000000;
    width: 200px;
    height: 50px;
}
```

### Layout Properties

- **`layout-mode`**: Controls flex behavior. Values: `top` (column), `left` (row), `center`, `right`, `bottom`.
- **`flex-weight`**: Determines how much space an element takes in a layout.
- **`anchor-width` / `anchor-height`**: Explicit sizing.
- **`padding`**, **`margin`**: Standard spacing (supports single or directional values).

## 5. Examples

### Basic Page

```html
<div class="container" data-hyui-title="My Guide">
    <div class="container-contents">
        <p style="font-size: 20; color: #FFCC00;">Welcome!</p>
        <button id="btn-ok">Click Me</button>
    </div>
</div>
```

### Tab Navigation

```html
<nav id="main-tabs" data-tabs="home:Home,settings:Settings" data-selected="home"></nav>

<div class="tab-content" data-hyui-tab-id="home">
    <p>Home Content</p>
</div>
<div class="tab-content" data-hyui-tab-id="settings">
    <p>Settings Content</p>
</div>
```

### Event Handling (Java)

Events defined in HYUIML must be handled in Java using the element's ID.

```java
builder.addEventListener("btn-ok", CustomUIEventBindingType.Activating, (comp, ctx) -> {
    player.sendMessage(Message.raw("Button clicked!"));
});
```

## 6. Resources & Documentation

- [Official HyUI GitHub](https://github.com/Elliesaur/HyUI)
- [HyUI Documentation](https://github.com/Elliesaur/HyUI/tree/main/docs)
