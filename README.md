# Construction Website

A modern, professional construction company website built with Next.js 16, Tailwind CSS, and TypeScript. Features multi-language support (Azerbaijani, English, Russian) and beautiful animations.

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **i18n:** next-intl
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features

- Multi-language support (AZ, EN, RU)
- Responsive design for all devices
- Modern UI with smooth animations
- SEO optimized
- Fast page loads with Next.js App Router
- Professional construction company design

## Pages

- **Home** - Hero section, services overview, projects, testimonials, CTA
- **About** - Company history, values, timeline
- **Services** - Detailed service offerings
- **Projects** - Project portfolio with filtering
- **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd construction-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
construction-website/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/            # Header, Footer, Navbar
│   ├── sections/          # Hero, Services, Projects, etc.
│   └── ui/                # Button, Card, Container
├── i18n/                  # Internationalization config
├── messages/              # Translation files (az, en, ru)
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Customization

### Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: #1e3a5f;      /* Deep Blue */
  --secondary: #f59e0b;    /* Orange/Amber */
  /* ... other colors */
}
```

### Translations

Edit the translation files in `messages/`:
- `az.json` - Azerbaijani
- `en.json` - English
- `ru.json` - Russian

### Company Information

Update contact details in:
- `components/layout/Footer.tsx`
- `app/[locale]/contact/page.tsx`
- Translation files

## License

MIT License

---

Built with Next.js and Tailwind CSS
