# UI Design Guidelines

This document outlines the UI/UX standards and best practices for the Prompta project. These guidelines ensure consistency, professionalism, and usability across all pages and components.

## Table of Contents

1. [Spacing System](#spacing-system)
2. [Padding & Margin](#padding--margin)
3. [Colors](#colors)
4. [Typography](#typography)
5. [Forms](#forms)
6. [Buttons](#buttons)
7. [Cards & Containers](#cards--containers)
8. [Layout](#layout)

---

## Spacing System

Professional UI design relies on a consistent spacing scale. This project uses an 8px base unit:

| Value | Usage |
|-------|-------|
| 4px | Micro spacing (rarely used) |
| 8px | Minimal gaps, label-to-input spacing |
| 12px | Small input padding, small element gaps |
| 16px | **Minimum recommended spacing** between elements |
| 20px | Default gaps between form fields, comfortable spacing |
| 24px | Standard padding in containers, spacing between sections |
| 28px | Medium spacing between major sections |
| 32px | Large container padding, prominent spacing |
| 40px | Extra large spacing, between major content blocks |
| 48px | Hero section vertical padding |

### Key Principles

- **Minimum spacing is 16px** - Never use less than 16px between unrelated elements
- **Consistent scale** - Always use values from the spacing system, not arbitrary numbers
- **Padding vs Margin** - Padding controls internal spacing within a container; Margin controls spacing between elements
- **Flex gaps** - When using flexbox, use `gap` property to control spacing between children uniformly

---

## Padding & Margin

### Container Padding

Containers should have consistent internal padding:

- **Small containers** (cards, modals): 20px - 24px
- **Medium containers** (sections): 24px - 32px
- **Large containers** (page sections): 32px - 40px
- **Input fields**: 12px vertical, 14px horizontal (12px 14px)

### Margin Patterns

**Between elements:**
- Form fields: 20px vertical gap
- Sections: 28px - 40px vertical margin
- Cards in grid: Use Tailwind's `gap-6` or `gap-8`

**External spacing:**
- Page margins: 24px - 32px from edges
- Top spacing below headers: 24px - 28px
- Bottom spacing before next section: 28px - 40px

### Label-to-Input Spacing

- Distance between form labels and their inputs: **8px margin-bottom** on label
- Distance between input and helper text: **8px**
- Distance between related form fields: **20px** (using flex gap)

---

## Colors

### Color Palette

The project uses a semantic color system. Primary colors are defined in design tokens:

**Primary Colors:**
- Primary Blue: `#0284c7` (used for interactive elements, buttons, links)
- Primary Dark: `#0369a1` (hover state for primary blue)
- Light background: `#f8fafc` (page backgrounds)
- White: `#ffffff` (card/container backgrounds)

**Neutral Colors:**
- Slate-50: `#f8fafc` (light backgrounds)
- Slate-100: `#f1f5f9` (secondary backgrounds)
- Slate-200: `#e2e8f0` (borders)
- Slate-500: `#64748b` (secondary text)
- Slate-600: `#475569` (body text)
- Slate-900: `#0f172a` (primary text, headings)

**Alert Colors:**
- Error Red: `#dc2626` (errors, destructive actions)
- Error Light: `#fef2f2` (error backgrounds)
- Error Dark: `#991b1b` (error text)

### Color Usage Rules

1. **Text Colors:**
   - Primary text: `#0f172a` (Slate-900)
   - Secondary text: `#64748b` (Slate-500) or `#475569` (Slate-600)
   - Disabled text: `#cbd5e1` (Slate-300)
   - Link text: `#0284c7` (Primary Blue)

2. **Background Colors:**
   - Page background: `#f8fafc` (Slate-50)
   - Card/container background: `#ffffff` (White)
   - Secondary background: `#f1f5f9` (Slate-100)

3. **Border Colors:**
   - Default borders: `#e2e8f0` (Slate-200)
   - Focused element borders: `#0284c7` (Primary Blue)
   - Error borders: `#dc2626` (Error Red)

4. **Interactive Elements:**
   - Default state: `#0284c7` (Primary Blue)
   - Hover state: `#0369a1` (Primary Dark)
   - Disabled state: `#94a3b8` (Slate-400)
   - Focus state: Border + box-shadow with blue tint

---

## Typography

### Font Sizes

- **H1 (Page Title)**: 24px, font-weight: 700
- **H2 (Section Title)**: 20px, font-weight: 600
- **Body Text**: 14px - 16px, font-weight: 400
- **Small Text** (labels, helper): 13px - 14px, font-weight: 500
- **Tiny Text** (captions): 12px, font-weight: 400

### Line Heights

- **Headings**: 1.2 - 1.3
- **Body text**: 1.5 - 1.6
- **Form labels**: 1.5
- **Code/monospace**: 1.5 - 1.6

### Font Weights

- **700**: Headings (H1, page titles)
- **600**: Section titles
- **500**: Labels, strong emphasis, button text
- **400**: Body text, paragraphs

---

## Forms

### Form Layout

1. **Single-column layout** - Never use multiple columns for form fields
2. **Full-width inputs** - Input fields should be 100% of their container width
3. **Consistent field heights** - All inputs should be 44px - 48px minimum height
4. **Label positioning** - Labels should be above inputs, not inside or beside

### Form Field Spacing

```
Form Group (div)
├─ Label (14px, weight 500)
│  margin-bottom: 8px
├─ Input (height: auto minimum 44px)
│  width: 100%
│  padding: 12px 14px
│  border: 1px solid #e2e8f0
│  border-radius: 6px
│
Form Group Gap: 20px (between groups)
```

### Input States

| State | Border | Background | Box Shadow |
|-------|--------|------------|-----------|
| Default | `#cbd5e1` | `#ffffff` | none |
| Focus | `#0284c7` | `#ffffff` | `0 0 0 3px rgba(2, 132, 199, 0.1)` |
| Error | `#dc2626` | `#fef2f2` | Error red shadow |
| Disabled | `#e2e8f0` | `#f1f5f9` | none |

### Form Group Components

```jsx
<div>
  <label htmlFor="fieldId" style={{
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#334155'
  }}>
    Field Label
  </label>
  <input
    id="fieldId"
    type="text"
    style={{
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box',
    }}
  />
</div>
```

### Form Error Display

- Error messages positioned above the form or above the problematic field
- Error background: `#fef2f2` with `#dc2626` left border (4px)
- Error text color: `#991b1b`
- Error message font size: 13px - 14px
- Padding: 12px 16px (or px-4 py-3)

---

## Buttons

### Button Sizes

| Size | Height | Padding | Font Size | Usage |
|------|--------|---------|-----------|-------|
| Small | 32px | 8px 12px | 13px | Inline actions, secondary |
| Medium | 40px | 10px 16px | 14px | Default primary buttons |
| Large | 44px | 12px 20px | 14px | Form submissions, prominent CTA |

### Button States

```
Default:   bg-#0284c7, color-white, cursor-pointer
Hover:     bg-#0369a1 (darker blue)
Active:    bg-#0d47a1 (even darker)
Disabled:  bg-#94a3b8, cursor-not-allowed
Loading:   bg-#94a3b8, show loading spinner
```

### Button Styling Rules

1. **Full-width buttons** in forms should be `width: 100%`
2. **Rounded corners** should be `border-radius: 6px`
3. **Text weight** should be `500` for good visibility
4. **Transition** should be `transition: all 0.2s` for smooth state changes
5. **No uppercase** - Use natural sentence case

### Button Examples

**Primary Button (Form Submit):**
```jsx
<button
  type="submit"
  style={{
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }}
>
  ログイン
</button>
```

**Secondary Button:**
```jsx
<button
  style={{
    padding: '10px 16px',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  }}
>
  キャンセル
</button>
```

---

## Cards & Containers

### Card Structure

```jsx
<div
  style={{
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  }}
>
  {/* Header (optional) */}
  <div style={{
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '24px 24px 20px 24px',
  }}>
    <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
      Card Title
    </h2>
  </div>

  {/* Content */}
  <div style={{ padding: '24px 24px' }}>
    {/* Card content */}
  </div>
</div>
```

### Card Sizing

- **Small cards**: max-width 300px
- **Medium cards**: max-width 400px - 500px
- **Large cards**: max-width 600px - 700px
- **Full-width cards**: `width: 100%`, max-width from container

### Card Padding

- **Internal padding**: 24px (standard), 32px (spacious)
- **Between card elements**: 20px - 24px
- **Header-to-content gap**: 20px (20px bottom padding on header + 24px top padding on content = 44px visual gap)

### Card Shadows

Use subtle shadows for depth:
- Light shadow: `0 1px 3px rgba(0, 0, 0, 0.1)` (default)
- Medium shadow: `0 4px 6px rgba(0, 0, 0, 0.1)` (hover)
- Heavy shadow: `0 10px 15px rgba(0, 0, 0, 0.1)` (focus/active)

---

## Layout

### Page Structure

```
┌─────────────────────────────────────┐
│          Page Background            │  bg-#f8fafc (min-height: 100vh)
│  ┌────────────────────────────────┐ │
│  │   Max-width Container (1280px) │ │  mx-auto, px-6, py-12
│  │                                │ │
│  │  Content                       │ │
│  │                                │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Container Widths

- **Mobile**: 100% - 16px padding (px-4 or px-6)
- **Small screens**: 100% - 32px padding
- **Standard page width**: max-width 1280px (1280px)
- **Narrow content** (login, forms): max-width 400px - 500px

### Responsive Padding

- **X-axis (horizontal)**: 16px - 32px depending on screen size
- **Y-axis (vertical)**:
  - Page top/bottom: 24px - 48px
  - Section spacing: 40px - 60px
  - Hero sections: 60px - 80px vertical padding

### Section Spacing

```
Section 1 (padding: 60px 0)
  ↓ 40px gap
Section 2 (padding: 40px 0)
  ↓ 40px gap
Section 3 (padding: 40px 0)
```

### Z-Index Scale

Use consistent z-index values for layering:

| Value | Element Type |
|-------|--------------|
| 1 | Hover states, shadows |
| 10 | Dropdowns |
| 20 | Modals, overlays |
| 30 | Tooltips, popovers |
| 40 | Notifications |
| 50 | Top navigation, sticky headers |

---

## Implementation Checklist

When building new pages or components:

- [ ] Use spacing values from the spacing system (8, 12, 16, 20, 24, 32, 40, 48)
- [ ] Apply consistent padding to containers (24px or 32px)
- [ ] Set proper gaps between form fields (20px)
- [ ] Use semantic colors from the color palette
- [ ] Include focus states for all interactive elements
- [ ] Test spacing on mobile (ensure readability and touch targets)
- [ ] Verify contrast ratios meet WCAG AA standards
- [ ] Use proper heading hierarchy (H1 → H2 → H3)
- [ ] Add transitions to interactive elements (0.2s)
- [ ] Limit container width to prevent very wide layouts

---

## Common Patterns

### Login/Auth Page Pattern

```
Page background: #f8fafc
Card max-width: 400px
Card background: #ffffff
Card padding: 32px
Form field gap: 20px
Label margin-bottom: 8px
Input padding: 12px 14px
Button margin-top: 8px
Footer margin-top: 24px
```

### Content Page Pattern

```
Page background: #f8fafc
Container max-width: 1280px
Container padding: 32px
Section spacing: 40px - 60px
Card padding: 24px - 32px
Heading size: 20px - 24px
```

---

## References

This guide was developed based on industry best practices and the following principles:

- **Consistency**: All spacing, colors, and typography follow defined standards
- **Readability**: Proper sizing and spacing ensure text is readable on all devices
- **Usability**: Touch targets are at least 44px, spacing prevents accidental clicks
- **Aesthetics**: Thoughtful spacing and colors create professional appearance
- **Accessibility**: Color contrast meets WCAG AA standards, interactive elements are clear

For questions or updates to these guidelines, please refer to recent design decisions in the project history.
