# Responsive Design Quick Reference

## 📱 Breakpoints

```css
/* Desktop: 960px and above (no media query needed - base styles) */
/* Tablet: 768px - 960px */
@media (max-width: 960px) { }

/* Mobile: 480px - 768px */
@media (max-width: 768px) { }

/* Small Mobile: 320px - 480px */
@media (max-width: 480px) { }

/* Extra Small: Below 320px */
@media (max-width: 320px) { }
```

## 🔤 Fluid Typography (Using clamp())

```css
/* Minimum | Preferred | Maximum */

/* Headings */
h1 { font-size: clamp(1.8rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.2rem, 3vw, 1.8rem); }

/* Paragraphs */
p { font-size: clamp(0.85rem, 2vw, 0.95rem); }

/* Benefits:
   - Smooth scaling between min and max
   - No jarring changes at breakpoints
   - Always readable on all devices
*/
```

## 📐 Spacing Guide

| Size | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| XS | 0.5rem | 0.5rem | 0.25rem |
| S | 1rem | 0.75rem | 0.5rem |
| M | 1.5rem | 1.25rem | 1rem |
| L | 2rem | 1.5rem | 1rem |
| XL | 3rem | 2rem | 1.5rem |

## 🎯 Touch Targets

```css
/* Minimum size for touch targets */
button, a[href] {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}

/* On mobile, buttons should be larger */
@media (max-width: 480px) {
  button { 
    min-height: 48px;
    padding: 14px 18px;
  }
}
```

## 🖼️ Common Responsive Patterns

### 1. Full Width Mobile, Multi-Column Desktop

```css
/* Desktop */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Tablet */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

### 2. Responsive Navigation

```css
/* Desktop: Horizontal menu */
.navbar {
  display: flex;
  flex-direction: row;
}

/* Tablet: Wrapped navigation */
@media (max-width: 960px) {
  .navbar {
    flex-wrap: wrap;
  }
}

/* Mobile: Vertical stack */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
}
```

### 3. Image Responsiveness

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Adjust image height on mobile */
@media (max-width: 480px) {
  img {
    max-height: 300px;
    object-fit: cover;
  }
}
```

## 🎨 CSS Variables for Responsive Design

```css
:root {
  /* Colors */
  --saffron: #FF9933;
  --white: #FFFFFF;
  --green: #138808;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Baloo 2', sans-serif;
}

@media (max-width: 768px) {
  :root {
    /* Override spacing for mobile */
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
  }
}
```

## ⚡ Performance Tips

### 1. Mobile-First Approach

```css
/* Base styles for mobile (smallest screens) */
body { font-size: 14px; }

/* Enhance for larger screens */
@media (min-width: 768px) {
  body { font-size: 16px; }
}
```

### 2. Avoid Performance Issues

```css
/* ❌ SLOW: This affects scrolling performance */
body {
  background-attachment: fixed;
}

/* ✅ BETTER: Disable on mobile */
@media (min-width: 1024px) {
  body {
    background-attachment: fixed;
  }
}
```

### 3. Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🔍 Testing Responsive Design

### Browser DevTools
1. Press F12 (Dev Tools)
2. Click device toggle (Ctrl+Shift+M on Windows, Cmd+Shift+M on Mac)
3. Test at these breakpoints:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)
   - iPad Pro (1024px)

### Common Device Sizes

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375px | 667px |
| iPhone 12 | 390px | 844px |
| Galaxy S20 | 360px | 800px |
| iPad Air | 768px | 1024px |
| iPad Pro | 1024px | 1366px |
| Desktop | 1920px | 1080px |

## 📊 Responsive Design Checklist

- [ ] Tested on mobile, tablet, and desktop
- [ ] Text is readable without zooming
- [ ] Touch targets are at least 44x44px
- [ ] Images scale proportionally
- [ ] Navigation works on mobile
- [ ] Forms are mobile-friendly
- [ ] No horizontal scrolling
- [ ] Performance tested on slow 4G
- [ ] Accessibility tested with screen reader
- [ ] Reduced motion respected

## 🛠️ Useful Responsive Snippets

### Hide/Show Elements

```css
/* Hide on mobile, show on desktop */
.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
}

/* Show on mobile, hide on desktop */
.mobile-only {
  display: block;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}
```

### Responsive Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
}
```

### Responsive Text Alignment

```css
/* Desktop: left align, Mobile: center */
.intro {
  text-align: left;
}

@media (max-width: 480px) {
  .intro {
    text-align: center;
  }
}
```

---

## 📚 Resources

- [CSS Tricks - Responsive Design](https://css-tricks.com/responsive-web-design/)
- [MDN - CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Web.dev - Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
