# CLAUDE.md — Workshop Vibe Coding

## Project Overview

Educational workshop repository teaching non-technical professionals how to build software with Claude Code. The project name is "Vibe coding met Claude Code." All content is in Dutch.

The repository contains:
- **`website/`** — An Eleventy static site with a Reveal.js presentation (the workshop slides and homepage)
- **`testrun-1/`** — Example output from a workshop test run (a generated HTML guide + Claude Code settings)

## Tech Stack

- **Static site generator:** Eleventy v3 (`@11ty/eleventy ^3.1.2`)
- **Presentation framework:** Reveal.js v5 (`reveal.js ^5.2.1`)
- **Templating:** Nunjucks (`.njk`) + Markdown with YAML frontmatter
- **Language:** JavaScript (Node.js ≥18)
- **No backend, no database** — pure static site

## Repository Structure

```
.
├── CLAUDE.md                         # This file
├── TODO.md                           # Project roadmap / task list
├── website/                          # Main Eleventy site
│   ├── package.json                  # Dependencies and scripts
│   ├── eleventy.config.js            # Eleventy configuration
│   └── src/
│       ├── index.njk                 # Homepage
│       ├── presentatie.njk           # Reveal.js presentation page
│       ├── _layouts/                 # Nunjucks layouts (base.njk, presentation.njk)
│       ├── presentation/             # Markdown slide files (sorted by filename prefix)
│       └── images/                   # Static image assets
└── testrun-1/                        # Workshop test run output
    ├── CLAUDE.md                     # Example user profile + AI principles
    ├── .claude/                      # Claude Code local settings
    └── index.html                    # Generated guide ("Claude Code in 10 Stappen")
```

## Development Commands

All commands run from the `website/` directory:

```bash
cd website
npm install          # Install dependencies
npm start            # Dev server with live reload on port 7890
npm run build        # Build static output to website/_site/
```

## Key Architecture Details

### Eleventy Configuration (`website/eleventy.config.js`)

- **Input:** `src/` — **Output:** `_site/`
- **Layouts:** `src/_layouts/` — **Includes:** `src/_includes/`
- Reveal.js dist/plugin files are copied from `node_modules/` via passthrough copy
- Static assets from `src/assets/` and `src/images/` are copied through
- A `fit-text` transform adds the `r-fit-text` CSS class to all `<h1>` and `<h2>` tags in presentation output
- The `slides` collection gathers `src/presentation/*.md` files, sorted alphabetically by filename

### Presentation Slides

- Located in `website/src/presentation/`
- Filename prefixes control ordering: `010-intro.md`, `020-programma.md`, `200-kennismaken.md`, etc.
- Each slide uses Markdown with Nunjucks templating
- Speaker notes go in `<aside class="notes">` blocks
- Reveal.js fragment classes (`fragment fade-right`, `fade-up`, etc.) control animations
- Shared frontmatter config in `presentation.11tydata.json`

### Layouts

- **`base.njk`** — Standard HTML page layout (header/main/footer)
- **`presentation.njk`** — Reveal.js slide deck layout with theme configuration

## Testing and CI

No test framework, linter, or CI/CD pipeline is configured. Verify changes by running `npm run build` in `website/` and checking the output.

## Coding Conventions

- **Content language:** Dutch (all UI strings, slides, and documentation)
- **Flat structure:** Avoid deep nesting and unnecessary abstractions
- **Feature-based grouping:** Slides organized by topic with numeric prefix ordering
- **Declarative config:** Use frontmatter and JSON data files for metadata
- **Nunjucks templating:** Use `{{ variable | filter }}` syntax, layouts via `layout` frontmatter key
- Follow AI-first principles documented in `testrun-1/CLAUDE.md` — prefer explicit, regenerable code

## Deployment

Target deployment: Hetzner VPS (CX32) with Nginx, wildcard SSL, and per-participant subdomains (`deelnemer1.workshop.johangorter.com`). See `TODO.md` for setup details.

## Git

- **Default branch:** `master`
- **Remote:** origin
