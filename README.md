# ZTechAI — AI Voice Agents Platform

> Enterprise conversational voice AI platform and high-performance marketing frontend built with Next.js 14, Tailwind CSS, and dynamic runtime environment configuration for containerized deployment (Dokploy/Docker).

---

## Features Overview

- **Marketing Website**: High-converting, responsive pages for US local businesses and healthcare clinics with interactive ROI calculator and direct Cal.com booking modal.
- **Dynamic Runtime Environment**: Live environment variable injection at container runtime via `getServerRuntimeConfig()`, `<script id="app-runtime-env">`, and `ConfigProvider`.
- **Zero Database Dependency**: Pure, deterministic, self-contained architecture with built-in data models and zero database failure modes.
- **SEO & AI Discovery**: Dynamic XML sitemap, `robots.txt`, dynamic `/llms.txt` and `/llms-full.txt` feeds, and automated Schema.org graphs across all routes.
- **Form & Lead Ingestion**: Dynamic email dispatch and n8n webhook forwarding with honeypot spam protection.
- **Zero Design Regression**: Fully preserves all animations, dark/light themes, and telephony assets.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional - sensible dev defaults provided)
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` to view the website.

---

## Production Deployment (Dokploy / Docker VPS)

Deploy via Docker standalone container. Dokploy injects environment variables at container startup without requiring image rebuilds:

```bash
docker build -t ztechai-voice .
docker run -p 3000:3000 --env-file .env ztechai-voice
```

---

## Documentation Suite

- [CMS Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/CMS.md)
- [Security Architecture](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/SECURITY.md)
- [Deployment Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/DEPLOYMENT.md)
- [Database Schema](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/DATABASE.md)
- [SEO & AI Discovery Guide](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/SEO.md)
- [Backup & Restore Procedures](file:///D:/Zubair/Antigravity/ZTechAI%20Website%20Developing/BACKUPS.md)
