# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Architecture

This is a UX portfolio website built with vanilla JavaScript and Vite as the build tool. The project follows a multi-page architecture with separate HTML pages for case studies.

### Key Components

**Multi-page Setup**: The site consists of a main index page and individual case study pages under `/cases/`. Each page is configured as a separate entry point in `vite.config.js`.

**Styling Architecture**: CSS is organized modularly:
- Global styles in `src/styles/` (reset, layout, typography)
- Page-specific styles (home.css, case-specific CSS files)
- CSS custom properties for theming (colors, radii)

**Asset Organization**: Images are organized by feature/case in `src/images/`, with subdirectories for each case study (convertiq, formbuilder, lighting).

### Development Patterns

**No Framework Dependencies**: This is a vanilla JavaScript project - avoid suggesting React, Vue, or other framework-specific solutions.

**CSS-First Approach**: The project uses modern CSS features extensively (custom properties, clamp(), grid, etc.) rather than JavaScript for layout and styling.

**Web Standards**: The project uses native web APIs (Web Components, Shadow DOM) rather than external libraries.