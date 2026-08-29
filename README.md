# HARSH LAB

**AI/ML engineering portfolio with evidence-based credentialing.**

Live Site: [https://harsh-lab-one.vercel.app](https://harsh-lab-one.vercel.app)

## The Evidence Model

This is not a standard portfolio. It is an engineering artifact designed to provide verifiable evidence of competence. Every claim is backed by data.

The core data model is located in `src/data/`:
- **`evidence.ts`**: Contains the audit snapshot (303 commits across 12 repositories as of Aug 2026), replacing subjective skill bars with qualitative evidence strength tiers (`VERY STRONG`, `STRONG`, `MODERATE`, `LIMITED`).
- **`credentials.ts`**: 19 verified credentials from Google, IBM, and others. No unverified or "in-progress" items are included.
- **`projects.ts`**: Production implementations and architectures categorized by focus area.

## Architecture

- **Core**: React 18 + TypeScript + Vite 8 (Rolldown)
- **3D / WebGL**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)
- **Scroll**: Lenis smooth scrolling (on supported desktop views)
- **Styling**: Tailwind CSS + Custom Performance CSS utilities

## Design Directions Explored

The site contains a built-in menu of multiple design explorations (accessible via the `Ctrl+Shift+V` switcher or the bottom navigation):
- **V7 NEXUS (Default)**: The canonical 3D WebGL experience.
- **V6 Precious Metals**: Premium brutalism with typography focus.
- **V5 God Tier**: High-contrast, monochromatic engineering focus.
- **V4 Evidence**: Data-heavy, terminal-inspired layout.
- **V1-3**: Legacy cyberpunk and terminal explorations.

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

## Production Build

```bash
# Build for production
npm run build
```

## Known Limitations

- The V7 NEXUS 3D experience requires a WebGL-capable desktop browser.
- Mobile devices automatically receive **NEXUS Lite**, a high-performance HTML-only version that maintains the same visual language and full information architecture without the GPU overhead.
