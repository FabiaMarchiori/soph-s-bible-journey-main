# AI Development Rules & Guidelines

> **Project:** Jornada Bíblica com Soph  
> **Aesthetic:** Streaming-library premium aesthetic, dark-first, highly polished.

---

## 1. Tech Stack Overview

* **React 19 & TypeScript:** Modern, type-safe component architecture.
* **TanStack Start & TanStack Router:** File-based routing system. All routes are defined in `src/routes/` (e.g., `src/routes/index.tsx`, `src/routes/trilhas.tsx`).
* **Tailwind CSS v4:** Modern utility-first styling with custom theme variables defined in `src/styles.css`.
* **Bible Design System (BDS):** A custom, highly reusable component library located in `src/components/bds/`.
* **GSAP & ScrollTrigger:** Used for high-performance, premium scroll-driven animations and reveals.
* **Lenis:** Smooth scrolling engine integrated with GSAP.
* **Sonner:** Toast notifications styled with BDS tokens.
* **Radix UI & Shadcn/ui:** Accessible primitives for complex interactive components (dialogs, sheets, accordions).
* **Zod:** Schema validation for search parameters, forms, and data structures.

---

## 2. Library Usage Rules

### 2.1. Styling & Design System (BDS)
* **Rule:** **NEVER** write custom CSS or inline styles for colors, shadows, or transitions. Always use Tailwind classes or the semantic CSS variables defined in `src/styles.css` (e.g., `bg-app-surface-elevated`, `text-app-text-muted`, `border-app-border`).
* **Rule:** **ALWAYS** import components from `@/components/bds` instead of creating custom buttons, inputs, badges, progress bars, or cards.
* **Rule:** Keep the dark-first, premium streaming aesthetic. Use gradients (`bg-gradient-brand`, `bg-gradient-hero`) and subtle glow effects (`shadow-glow`, `glow-primary`) to highlight active states.

### 2.2. Routing & Navigation
* **Rule:** Use TanStack Router conventions. Define routes in `src/routes/` using `createFileRoute`.
* **Rule:** Use the `<Link>` component from `@tanstack/react-router` for internal navigation.
* **Rule:** Do **NOT** create a `src/pages/` directory or use Next.js/Remix routing conventions.

### 2.3. Animations
* **Rule:** Use the `useReveal` hook from `src/hooks/use-reveal.ts` for scroll-triggered fade-up animations.
* **Rule:** Always respect user preferences for motion. Check `prefersReducedMotion()` from `@/lib/animations` before initializing GSAP timelines.
* **Rule:** Use Tailwind transition utilities (`transition-smooth`, `transition-fast`) for simple hover and active states.

### 2.4. Feedback & Notifications
* **Rule:** Use the `feedback` helper from `@/components/bds` (which wraps `sonner`) for all user notifications:
  * `feedback.success(message, description)`
  * `feedback.error(message, description)`
  * `feedback.info(message, description)`
  * `feedback.achievement(message, description)`

### 2.5. Icons
* **Rule:** Use `lucide-react` for all icons. Keep icon sizes consistent (usually `h-4 w-4` or `h-5 w-5`).

---

## 3. Code Quality & Architecture

* **No Placeholders:** Never write partial code, `TODO` comments, or mock functions that require the user to complete them. Every change must be fully functional.
* **Component Size:** Keep components small, focused, and under 100 lines of code when possible. Extract sub-components into separate files.
* **Responsive Design:** Every layout must be fully responsive, mobile-first, and look stunning on mobile, tablet, and desktop screens.
* **Error Handling:** Let errors bubble up naturally to the TanStack Router error boundary (`ErrorComponent` in `__root.tsx`) instead of swallowing them with silent `try/catch` blocks.