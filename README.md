# Marcin Białecki — Personal Brand Site

Dark glassmorphism personal brand site. Production-ready, one-page, pure HTML/CSS/JS.

---

## Before Launch — Replace These Placeholders

Search for these strings and replace with real values:

| Placeholder | What to put there |
|---|---|
| `[EMAIL]` | Your real email address |
| `[CALENDLY_URL]` | Your Calendly booking link |
| `[LINKEDIN_URL]` | Full LinkedIn URL |
| `[MARCIN_LINKEDIN]` | Just your LinkedIn slug (e.g. `marcinbialecki`) |
| `[WLC_NORGE_URL]` | WLC NORGE website URL |
| `[FORM_ID]` | Formspree form ID (see below) |
| `[SITE_URL]` | Your domain (e.g. `https://marcinbialecki.no`) |
| `[UCZELNIA — REPLACE]` | University name in Schema JSON-LD |
| `[MARCIN_PHOTO_URL]` | Use local file: `assets/images/marcin-profile.jpg` |

**Case studies** — replace the Polish placeholder text in Section 7 with real project details.
**Testimonials** — replace placeholder quotes in Section 8 with real ones before launch.
**Stats** — verify `data-target` numbers in `.stat-num` elements in `index.html`.

---

## Adding Your Photo

Place your professional photo at:
```
assets/images/marcin-profile.jpg
```
Recommended: 480×640px WebP or JPEG, subject top-centered.

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

That's it — Vercel auto-detects static sites. No config needed.

---

## Connect Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → get your Form ID (e.g. `xabc1234`)
3. In `index.html` replace `[FORM_ID]` with your ID:
   ```html
   <form action="https://formspree.io/f/xabc1234" ...>
   ```
4. Test by submitting the form — you'll get an email confirmation

---

## Connect Calendly

1. Go to [calendly.com](https://calendly.com) and set up your free 30-min call event
2. Copy the link (e.g. `https://calendly.com/marcin-bialecki/30min`)
3. In `index.html` replace all `[CALENDLY_URL]` with your link (there are 3 occurrences)

---

## Update Schema JSON-LD

The Schema is in `index.html` inside `<script type="application/ld+json">`.
Replace all placeholders there with real values — especially:
- `"url"` → your domain
- `"email"` → your email
- `"image"` → full URL to your photo
- `"alumniOf"` → your university name
- `"sameAs"` → your LinkedIn URL

Validate at: [schema.org/SchemaValidator](https://validator.schema.org)

---

## File Structure

```
/
├── index.html          — Full one-page site
├── style.css           — Complete design system
├── main.js             — Animations & interactions
├── README.md           — This file
└── assets/
    └── images/
        ├── marcin-profile.jpg     ← ADD YOUR PHOTO HERE
        └── og-image.jpg           ← ADD 1200×630 OG image
```

---

## robots.txt

Create `robots.txt` at root:
```
User-agent: *
Allow: /
Sitemap: https://marcinbialecki.no/sitemap.xml
```

## sitemap.xml

Create `sitemap.xml` at root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://marcinbialecki.no/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

Built with pure HTML/CSS/JS. Designed with best practices from web design research 2025–2026.
