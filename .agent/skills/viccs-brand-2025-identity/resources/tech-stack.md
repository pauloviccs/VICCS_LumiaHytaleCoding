# Preferred Tech Stack & Implementation Rules

When building digital products for the Viccs Brand, use this stack to ensure high performance and creative freedom.

## Core Stack

* **Framework:** React (Next.js preferred for portfolio/SEO)
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion (Essential for showcasing Motion Design skills)
* **3D:** React Three Fiber (Optional, for showcasing 3D skills directly in browser)
* **CMS:** Headless usage of Wix or WordPress (if legacy requested), otherwise JSON/Markdown data sources.

## Implementation Guidelines

### 1. Visual Style (Tailwind)

* **Dark Mode Default:** The brand usually leads with a dark aesthetic to make artwork pop.
* **Grid Layouts:** Use CSS Grid extensively for gallery/portfolio masonry layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
* **Images:** Always use `object-cover` and rounded corners (`rounded-lg`) for portfolio thumbnails.

### 2. Component Patterns

* **Hero Section:** Full viewport height (`h-screen`), large typography, dynamic background (video or subtle 3D).
* **Project Card:** Interactive hover state (scale up `scale-105`, shadow bloom), clearly visible title and tags.
* **Contact Form:** Simple, clean, high contrast input fields.

### 3. Motion Guidelines

* **Entrance:** Elements should fade in and slide up (`y: 20 -> y: 0`) when scrolling into view.
* **Interactions:** snappy and responsive.
