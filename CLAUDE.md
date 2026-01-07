# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML resume website with dark/light mode toggle. No build process or dependencies - pure vanilla HTML, CSS, and JavaScript.

## Local Development

```bash
# Serve locally (pick one)
python -m http.server 8000
npx serve
php -S localhost:8000
```

Then open http://localhost:8000

## Architecture

- **index.html** - Single-page resume with semantic HTML sections (Profile, Skills, Experience, Education)
- **css/theme.css** - CSS custom properties for light/dark themes, toggle button styles
- **css/style.css** - Layout, typography, responsive breakpoints (768px, 480px), print styles
- **js/theme-toggle.js** - Theme switching with localStorage persistence and system preference detection
- **assets/** - PDF resume for download

## Theme System

Themes use CSS custom properties on `:root` (light) and `[data-theme="dark"]`. The JavaScript sets `data-theme` attribute on `<html>` and persists choice to localStorage under key `resume-theme`.

## Print Styles

Print media query in style.css hides navigation and theme toggle, converts to black/white, and adds URL text after external links.
