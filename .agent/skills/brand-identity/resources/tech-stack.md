# Preferred Tech Stack & Implementation Rules

When generating code or UI components for this brand, you **MUST** strictly adhere to the following technology choices to achieve the "Liquid Glass" aesthetic.

## Core Stack

* **Framework:** React (TypeScript preferred)
* **Styling Engine:** Tailwind CSS (Mandatory) + CSS Modules for complex gradients/animations if needed.
* **Animation Library:** Framer Motion (Crucial for smooth, physics-based interactions).
* **3D/Visuals:** React Three Fiber (drei) for floating 3D elements or shaders if requested.
* **Component Library:** Headless UI or Radix UI (styled with Tailwind) to maintain full custom control over the glass look. Avoid pre-styled heavy libraries like Bootstrap or Material UI.

## Implementation Guidelines

### 1. Tailwind & Glassmorphism Usage

* **Glass Effect:** Use `backdrop-blur-*`, `bg-white/10` (or black), and `border-white/10` to create depth.
* **Gradients:** Use mesh gradients or vivid animated gradients for backgrounds/accents.
* **Dark Mode:** The default is often Dark for this aesthetic, but ensure contrast is high using white text with varying opacity (e.g., `text-white/80` for secondary).

### 2. Component Patterns

* **Cards/Containers:** rounded-2xl or 3xl, `backdrop-blur-xl`, thin subtle border (`border border-white/10`), subtle shadow.
* **Buttons:**
  * *Primary:* High saturation background or gradient, rounded-full, distinct hover scale effect (using Framer Motion).
  * *Secondary:* Glass style, transparent bg with border blur.
* **Typography:** Tight tracking (`tracking-tight`) for large headings. Clean, sans-serif.

### 3. Motion Guidelines (Framer Motion)

* **Transitions:** Use `type: "spring"` with low stiffness/damping for "bouncy" organic feel suitable for Apple-like interfaces.
* **Hover:** All interactive elements must have a scale/brightness response.
* **Scroll:** Parallax effects or reveal-on-scroll are encouraged.

### 4. Forbidden Patterns

* Do NOT use flat, solid, opaque gray backgrounds unless for contrast.
* Do NOT use standard box-shadows (default Tailwind shadows); prefer colored glows or glass shadows.
* Do NOT use serif fonts unless explicitly requested for editorial sections.
