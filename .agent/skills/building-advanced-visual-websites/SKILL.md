---
name: building-advanced-visual-websites
description: Designs, plans, and validates high-performance websites with complex visual components such as 3D rendering, GPU-accelerated animations, shader-based effects, and Liquid Glass–style interfaces. Use when the user mentions WebGPU, Three.js, advanced UI effects, interactive portfolios, creative web experiences, or performance-critical visual simulations.
---

# Building Advanced Visual Websites

## When to use this skill

- When the user asks for "Advanced UI", "3D effects", "WebGL", "Three.js", or "Shaders".
- When creating high-end portfolios or immersive brand experiences (like Apple/Riot Games/Agency sites).
- When implementing physics-based animations, glassmorphism, or complex scroll interactions.
- When performance is critical for heavy visual loads (GPU acceleration usage).

## Workflow

1. **Technology Selection**:
    - **Core**: React Three Fiber (R3F) for declarative 3D.
    - **Shaders**: TSL (Three Shading Language) or GLSL via `drei/shaderMaterial`.
    - **Animation**: GSAP (Timeline control) or Framer Motion (UI transitions).
    - **Post-Processing**: `react-postprocessing` for Bloom, Depth of Field, Noise.
2. **Scene Setup**:
    - Initialize `<Canvas>` with proper pixel ratio (`dpr={[1, 2]}`) and shadows.
    - Configure `OrbitControls` or `ScrollControls` for navigation.
3. **Optimization Strategy**:
    - Use `InstancedMesh` for repeating objects (>100 instances).
    - Enable `useFrame` loops selectively; avoid heavy logic in the render loop.
    - Draco compress all GLTF models.
4. **Integration**:
    - Overlay HTML UI using `<Html>` from `@react-three/drei` or standard absolute positioning on top of the Canvas.

## Instructions

### Liquid Glass & Shader Effects

To achieve the "Liquid Glass" look:

1. **Material**: Use `MeshPhysicalMaterial`.
2. **Settings**:
    - `transmission: 0.95` (Glass transparency)
    - `roughness: 0.1` (Smoothness)
    - `thickness: 1.5` (Refraction depth)
    - `ior: 1.5` (Index of Refraction)
3. **Lighting**: High-contrast environment map (`Environment` from drei) is crucial for reflections.

### React Three Fiber (R3F) Helper

- **Canvas**: The root entry point.
- **Hooks**:
  - `useThree()`: Access camera, scene, renderer.
  - `useFrame((state, delta) => ...)`: Run code every frame (animation loop).
  - `useLoader(GLTFLoader, '/path')`: Load 3D assets.

### Performance Rules

- **Do not** create new materials or geometries inside `useFrame`.
- **Do** dispose of heavy assets when unmounting (R3F handles most, but be careful with custom textures).
- **Do** use lazy loading (`Suspense`) for heavy 3D models.

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei (Helpers) Docs](https://github.com/pmndrs/drei)
- [The Book of Shaders](https://thebookofshaders.com/)
- [GSAP Documentation](https://greensock.com/docs/)
