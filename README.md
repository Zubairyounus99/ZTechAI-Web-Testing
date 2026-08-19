# ZTechAI — AI Voice Agents Platform & Self-Hosted CMS

> Enterprise conversational voice AI platform, marketing frontend, and self-hosted SEO blogging CMS built with Next.js 14, Tailwind CSS, PostgreSQL, and Prisma ORM.

---

## Features Overview

- **Marketing Website**: High-converting, responsive pages for US local businesses and healthcare clinics with interactive ROI calculator and direct Cal.com booking modal.
- **Self-Hosted CMS**: Native content management running inside Next.js with PostgreSQL and Prisma (no external Strapi/WordPress servers).
- **SEO & AI Discovery**: Dynamic XML sitemap, `robots.txt`, dynamic `/llms.txt` and `/llms-full.txt` feeds, and automated Schema.org graphs across all routes.
- **Media Manager**: Docker persistent volume storage with mandatory media usage detection.
- **Obscure Admin Gateway**: Configurable secret path (`CMS_ADMIN_PATH`) with rate-limited brute-force defense.
- **Automated 301 Redirects**: Automatically preserves SEO equity when article slugs change.
- **Zero Design Regression**: Fully preserves all animations, dark/light themes, n8n webhook, and telephony assets.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Generate Prisma client & sync schema
npx prisma generate
npx prisma db push

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to view the website, or `http://localhost:3000/blog` for the blog.

---

## Production Deployment (Dokploy / Docker VPS)

Refer to [DEPLOYMENT.md](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/DEPLOYMENT.md) for full instructions on deploying via Dokploy or Docker Compose.

---

## Documentation Suite

- [CMS Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/CMS.md)
- [Security Architecture](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/SECURITY.md)
- [Deployment Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/DEPLOYMENT.md)
- [Database Schema](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/DATABASE.md)
- [SEO & AI Discovery Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/SEO.md)
- [Backup & Restore Procedures](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/BACKUPS.md)
