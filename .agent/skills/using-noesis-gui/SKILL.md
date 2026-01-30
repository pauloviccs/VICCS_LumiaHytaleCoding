---
name: using-noesis-gui
description: Guides the creation of user interfaces using NoesisGUI, specifically for game development and Hytale modding. Use when the user asks about Noesis, XAML UI in games, or Hytale interfaces.
---

# Using NoesisGUI

## When to use this skill

- The user wants to create a **custom UI** for Hytale.
- The user asks about **NoesisGUI** or **XAML** in the context of game development.
- The user needs to implement **MVVM** (Model-View-ViewModel) for a game interface.
- The user wants to optimize UI performance in Hytale.

## Workflow

1. **Define Requirements**: Identify the purpose of the UI (HUD, Inventory, Main Menu, etc.).
2. **Setup Environment**: Ensure the user has a XAML editor (Visual Studio Code with Noesis Extension or Noesis Studio).
3. **Draft layout (XAML)**: Create the visual structure using standard XAML controls (`Grid`, `StackPanel`, `Border`, `ControlTemplate`).
4. **Implement Logic (Code-Behind/ViewModel)**: Define the data context and bind properties.
5. **Integrate**: Connect the XAML to the game engine (Hytale) using the appropriate registration methods.

## Instructions

### 1. Basic XAML Structure

Start with a `UserControl` or `Page` as the root.

```xml
<UserControl
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d"
    d:DesignWidth="1280" d:DesignHeight="720">

    <Grid>
        <!-- UI Elements Go Here -->
        <TextBlock Text="Hello Hytale!" HorizontalAlignment="Center" VerticalAlignment="Center" Foreground="White"/>
    </Grid>

</UserControl>
```

### 2. Data Binding (MVVM)

NoesisGUI relies heavily on Data Binding. Avoid referencing UI elements directly in code (e.g., `button.Content = "..."`). Instead, bind to properties in a ViewModel.

**XAML:**

```xml
<TextBlock Text="{Binding PlayerName}" />
<Button Command="{Binding AttackCommand}" Content="Attack" />
```

**C# (ViewModel Concept):**
Ensure your data context implements `INotifyPropertyChanged`.

```csharp
public class PlayerViewModel : INotifyPropertyChanged {
    private string _playerName;
    public string PlayerName {
        get => _playerName;
        set {
            _playerName = value;
            OnPropertyChanged("PlayerName");
        }
    }
    // ... Command implementations
}
```

### 3. Hytale Specifics

- **Registration**: Hytale mods typically register UI files in a client-side proxy or initialization step.
- **Assets**: Reference images using relative paths or Hytale's asset system URIs if applicable.
- **Input**: Ensure the UI handles input focus correctly so it doesn't conflict with game controls.

### 4. Best Practices for Performance

- **Batching**: Group static elements.
- **Hit Testing**: Set `IsHitTestVisible="False"` on elements that don't need interaction (like background decorations) to save processing time.
- **Complexity**: Avoid deep nesting of visual trees. Use `Canvas` for simple 2D positioning if `Grid` is too heavy, though `Grid` is usually preferred for responsive layouts.

## Resources

- [NoesisGUI Documentation](https://www.noesisengine.com/docs/Gui.Core.Index.html)
- [Hytale Modding Docs](https://hytale.com/modding) (Check for specific Noesis integration guides)
