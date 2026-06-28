# Digital Pixel Studio — Website Instructions

## 🎨 THEME
- **Primary:** Neon Red (`#ff0040`)
- **Secondary:** Black (`#0a0a0a`, `#111`)
- **Accent:** Gold (`#ffd700`)
- **Style:** Cyberpunk / Neon LED with premium feel
- **Fonts:** Orbitron (headings), Rajdhani (body), Exo 2 (alt text)
- All three fonts imported via Google Fonts in one request

## 🔤 LOGO
- Custom SVG icon: 4 rounded squares (2 red + 2 gold) forming a 2x2 grid
- Text: "Digital" (white) + "Pixel" (gold) + "Studio" (muted gray)
- Same font size across all words — clean, professional, uniform
- Defined as `.logo-icon` wrapper → `.logo-svg` + `.logo-text-group`
- Applied to **index.html**, **login.html**, **dashboard.html** navbars + footer

## 🧠 ANIMATIONS (120fps Optimized)

| Animation | Method | Where Used |
|-----------|--------|------------|
| **Breathing (glow pulse)** | `@keyframes breathe` — opacity + text-shadow | Logo dot, hero badge, hero headings, section titles, "Convert" text |
| **Breathing gold** | `@keyframes breatheGold` | Gold accent elements |
| **Breathing slow** | `.breathing-slow` — 6s cycle | All 8 section titles |
| **Color shifting** | `@keyframes colorShift` — red → gold → red | Hero stats numbers, "Convert" span |
| **Particle float** | 15 particles rising from bottom, staggered delays | Hero background |
| **Grid move** | `.hero-grid` translating 60px diagonally, 25s loop | Hero background |
| **Scan line** | Horizontal line sweeping top→bottom, 4s loop | Hero background |
| **Floating orbs** | 3 blurred circles (red/gold) floating, 12-15s loops | Hero background |
| **Cyber lines** | 2 thin glowing lines sliding across | Hero background |
| **Scroll reveal** | IntersectionObserver with 120ms staggered delay per sibling | All section elements |
| **Counter animation** | Number counting up with eased timing on scroll | Hero stats (500+, 850+, etc.) |
| **3D hero tilt** | Mouse move → subtle perspective rotate on `.hero-content` | Desktop only |
| **WhatsApp pulse** | Box-shadow pulsing green, 3s | WhatsApp button |
| **Hover transitions** | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` throughout | Cards, buttons, links |

### Performance Keys
- `will-change: transform, opacity` on all animated elements
- `transform: translateZ(0)` via GPU acceleration
- `requestAnimationFrame` for JS-driven animations
- Scroll listener throttled with `ticking` flag
- `prefers-reduced-motion` respected — all animations disabled
- Touch devices: hover transforms removed, replaced with active scale(0.98)

## 📱 RESPONSIVE — NO HORIZONTAL SCROLL
- `html { overflow-x: hidden; width: 100%; }` — prevents ALL horizontal overflow
- `body { overflow-x: hidden; }` — double overflow guard
- `.hero-bg { overflow: hidden; }` — contains particles, orbs, scan line, cyber lines
- Cyber lines kept at `width: 100%; height: 100%` (never 200%) — prevents overflow
- Font sizes use `clamp()` — seamless scaling between breakpoints
- `env(safe-area-inset-*)` for notched devices
- Touch devices always show hamburger via `@media (hover: none) and (pointer: coarse)`

## 🍔 HAMBURGER (3 DOTS / 3 LINES)
- Always visible on touch devices (`hover: none and pointer: coarse`)
- Fixed right-side drawer menu with backdrop blur
- Closes on link click + restores body scroll
- Body scroll locked when menu open (`document.body.style.overflow = 'hidden'`)

## 💬 WHATSAPP BUTTON — NO CLIPPING / NO SEPARATE OVERFLOW
- `position: fixed; bottom: max(16px, env(safe-area-inset-bottom)); right: max(16px, env(safe-area-inset-right))`
- Sizes: 56px (default) → 48px (≤480px) → 42px (≤380px)
- Pulsing green glow animation
- Links to `https://wa.me/919620024812`
- Never requires horizontal scroll — always within viewport
- Overlaps page content naturally (fixed positioning)

## 📄 SECTIONS (index.html)
1. **Navbar** — Fixed top, transparent → scrolled (blur + border)
2. **Hero** — Full viewport, animated background, headline, CTA buttons, stats counter
3. **Services** — 6 cards (Web Dev, E-Com, Mobile, SEO, UI/UX, Cloud)
4. **Portfolio** — Filterable gallery (All/Websites/E-Commerce/Mobile Apps/Branding)
5. **Process** — 5 steps (Discovery → Strategy → Design → Dev → Launch)
6. **Pricing** — 3 tiers (₹49,999 / ₹99,999 / ₹2,49,999)
7. **Testimonials** — 15 client reviews loaded dynamically from JS array
8. **FAQ** — Accordion with 7 questions
9. **Contact** — 2-column: contact info + form with website type dropdown
10. **Google Map** — Embedded with dark overlay
11. **Footer** — 4-column grid with links, social, copyright

## 📝 CONTACT FORM
- Fields: Full Name, Phone, Email, Website Type (dropdown), Project Details
- On submit: asks user → **OK = WhatsApp** / **Cancel = Email**
- WhatsApp: opens `wa.me` with pre-filled message
- Email: opens `mailto:` with subject + body
- Dropdown options: Business Website, E-Commerce Store, Portfolio, Landing Page, Blog, Web Application, Mobile App, Redesign, Other

## 🗺️ GOOGLE MAP
- Embedded iframe at M.G Road, Bangalore
- CSS filter: `grayscale(1) invert(1)` — dark theme matching site
- Overlay with address text on left side
- On mobile: overlay becomes relative-positioned (full width)

## 🖼️ IMAGES
- Portfolio: Unsplash source URLs (`images.unsplash.com/...`)
- Testimonials: Pravatar (`i.pravatar.cc/100?img=N`)
- All images use `loading="lazy"`
- Preconnect to `images.unsplash.com` and `fonts.googleapis.com`
- No emojis for avatars — real human faces from pravatar

## 🔐 AUTH (login / dashboard)
- **login.html**: Register (Name, Email, Phone, Password) or Sign In
- **dashboard.html**: Shows active/completed projects, support tickets, milestone, project table
- Uses `localStorage` for user storage (`dps_users`, `dps_logged_in`)
- Redirects to dashboard on login, shows user name, logout button clears session
- Guards: if not logged in and tries to access dashboard → redirects to login

## 🧰 PERFORMANCE TIPS
- `<link rel="preconnect">` for Google Fonts and Unsplash
- `<link rel="dns-prefetch">` for external domains
- Font Awesome loaded from CDN
- All animations use `will-change` for GPU acceleration
- Images lazy-loaded
- No external JS dependencies besides Font Awesome
- `requestIdleCallback` for non-critical initialization

## 🚀 DEPLOYMENT
- Static HTML/CSS/JS — no build step needed
- Push to GitHub, deploy to Netlify via zip upload or git integration
- Netlify handles HTTPS, CDN, and automatic redirects

## ✅ FINAL QUALITY CHECKS
- [ ] No horizontal scrollbar on any device/viewport
- [ ] Hamburger visible on mobile touch devices
- [ ] WhatsApp button always in viewport (no clipping)
- [ ] All 15 testimonials load with staggered animation
- [ ] Portfolio filter works smoothly
- [ ] FAQ accordion opens/closes correctly
- [ ] Contact form submits via WhatsApp or Email
- [ ] Login/Register flow works (localStorage)
- [ ] Breathing effects visible on section titles
- [ ] Background animations visible in hero
- [ ] Map renders with dark theme
- [ ] Mobile "Desktop site" mode works without breaking layout
- [ ] `prefers-reduced-motion` respected
- [ ] Touch devices don't have sticky hover states

---

*Generated for Digital Pixel Studio — June 2026*
