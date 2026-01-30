# Hytale World Generation V2

Hytale's World Generation V2 is defined by a data-driven pipeline that uses **Density Fields** and **Assignments** to procedurally generate terrain and populate it with content.

## Core Concepts

### Density Fields & Noise

Terrain shape is primarily defined by **Density Fields**. These are 3D maps of decimal values.

- **Positive Values**: Solid terrain.
- **Negative Values**: Empty space (air).
- **Function Nodes**: Math operations (Add, Multiply, Absolute, Normalize) used to manipulate these fields.

**Common Formula**: `Terrain = BaseHeight + NoiseField`

### Assignments

Assignments control how **Props** (trees, rocks, structures) are placed based on the underlying density or position.

- **Constant**: Assigns a Prop to *all* valid positions.
- **FieldFunction**: Selects a Prop based on a Density Field value at that coordinate (e.g., specific flowers only spawn where moisture density > 0.8).
- **Sandwich**: Assigns Props based on vertical height (Y-level). Useful for stratification (e.g., stone deep down, dirt near surface).
- **Weighted**: Randomly picks props based on a seed and weight table.

### Block Masks

Block Masks determine replacement rules when placing features. They solve problems like "Don't place a tree inside a rock" or "Replace water with ice in cold biomes".

- **Source Material**: The block you are trying to place.
- **Destination Material**: The block currently occupying the space.
- **DontPlace**: A set of blocks that, if acting as Source, cancel the placement.
- **DontReplace**: A set of Destination blocks that cannot be overwritten (e.g., Bedrock).

## Technical Generator

The generator runs in passes.

1. **Scanners**: Analyze the world to find points of interest.
2. **Assignments**: Decide what goes where.
3. **Patterns**: define the actual block layout of features.

**Tip**: Use the **Hytale Node Editor** (when available) to visualize density fields. Since it's not currently public, focus on understanding the `FieldFunction` logic: mapping a noise value (0.0 to 1.0) to a specific outcome.
