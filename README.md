# sithira.me

Personal blog and portfolio site for Sithira Senanayake — built with Next.js 15, Contentlayer, and Tailwind CSS 4.

Live at [sithira.me](https://sithira.me)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Content:** Contentlayer 2 (MDX)
- **Styling:** Tailwind CSS 4, `@tailwindcss/typography`
- **Auth:** NextAuth v5 (GitHub OAuth)
- **Comments:** Giscus
- **Deployment:** Vercel

## Features

- Blog with MDX support (math via KaTeX, syntax highlighting, GFM)
- Short-form notes
- Bookmarks collection
- /now page
- Tag-based filtering
- RSS feed (`/feed.xml`)
- Dark/light theme toggle
- SEO (structured data, sitemap, robots.txt, Open Graph)
- Admin dashboard (authenticated via GitHub) for creating notes, bookmarks, and updating the /now page
- Giscus comments on blog posts

## Project Structure

```
posts/
  published/       # Blog posts (MDX)
  notes/           # Short notes (MDX)
src/
  app/             # Next.js App Router pages
    admin/         # Authenticated admin dashboard
    blog/          # Blog listing and post pages
    notes/         # Notes listing
    bookmarks/     # Bookmarks page
    now/           # /now page
  components/      # Shared UI components
  data/            # Site metadata, nav links, bookmarks/now JSON
  lib/             # GitHub API helper, utilities
  layouts/         # Post layout
contentlayer.config.ts  # Content schema definitions
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file and fill in values:
   ```bash
   cp .env.local.example .env.local
   ```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | NextAuth secret (`openssl rand -base64 32`) |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `GITHUB_PAT` | Fine-grained PAT with Contents read/write on this repo |
| `ALLOWED_GITHUB_USERNAME` | GitHub username allowed to access admin |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

Runs on port 4020 by default.

## Content

### Blog Posts

Add MDX files to `posts/published/`. Frontmatter:

```yaml
---
title: Post Title
date: 2026-01-01
tags: [tag1, tag2]
summary: Short description
draft: false
---
```

### Notes

Add MDX files to `posts/notes/` or use the admin dashboard at `/admin/notes`. Frontmatter:

```yaml
---
date: 2026-01-01T12:00:00
tags: [note]
---
```

## Admin Dashboard

Accessible at `/admin` — requires GitHub OAuth sign-in with the allowed username. Supports:

- Creating notes (commits directly to repo via GitHub API)
- Adding bookmarks
- Updating the /now page
