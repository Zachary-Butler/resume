# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML resume website with dark/light mode toggle. No build process, no package.json, no installed dependencies - pure vanilla HTML, CSS, and JavaScript. Dependencies (Puppeteer, http-server) are only installed when needed for PDF generation.

## Local Development

```bash
# Serve locally (pick one)
python -m http.server 8000
npx serve
php -S localhost:8000
```

Then open http://localhost:8000

**Testing Changes**: Since GitHub Pages deploys directly from main, always test changes locally before pushing.

## Architecture

- **index.html** - Single-page resume with semantic HTML sections (Profile, Skills, Experience, Education)
- **css/theme.css** - CSS custom properties for light/dark themes, toggle button styles
- **css/style.css** - Layout, typography, responsive breakpoints (768px, 480px), print styles
- **js/theme-toggle.js** - Theme switching with localStorage persistence and system preference detection
- **tailored/** - Role-specific tailored HTML resume versions (not linked from main page; CSS/JS paths use `../` prefix)
- **assets/** - PDF resume for download
  - **assets/tailored/** - Role-specific tailored resume PDFs
  - **assets/cover-letters/** - Cover letters by application

## Job Search Writing

When writing or revising resumes or cover letters, read `job-search-style-guide.md` first. Key rules:
- Cover letters use bold-lead competency paragraphs — see the guide for the structure
- Never open a cover letter with "I am writing to apply for..."
- Credential emphasis shifts by role type — the guide has an anchor table
- Sign off as **Zach Butler**, not Zachary Butler

The Health District letter (`assets/cover-letters/Butler_HealthDistrict_cover_letter.pdf`) is the reference example — use it as a model for structure and voice when drafting new cover letters.

## Theme System

Themes use CSS custom properties on `:root` (light) and `[data-theme="dark"]`. The JavaScript sets `data-theme` attribute on `<html>` and persists choice to localStorage under key `resume-theme`.

## Print Styles

Print media query in style.css hides navigation and theme toggle, converts to black/white, and adds URL text after external links.

## PDF Generation

**Automated**: GitHub Actions workflow (.github/workflows/main.yml) automatically generates PDF on every push to main using Puppeteer. The workflow ignores changes to `assets/*.pdf` to prevent infinite loops when auto-committing generated PDFs.

**Manual**: Run locally with:
```bash
npm install puppeteer http-server
node generate-pdf.js
```

The script (generate-pdf.js) starts a local server, launches headless Chrome, navigates to the site, and saves PDF to assets/Zachary_Butler_Resume_2025.pdf.

**Note**: The PDF filename is hardcoded in both generate-pdf.js and the workflow. Update the year when needed.

## Deployment

GitHub Pages serves the site directly from the main branch root. No build step required - changes to index.html or CSS are live immediately after push.
