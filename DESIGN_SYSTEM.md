# Prompta Design System

## Overview

The Prompta Design System is a comprehensive, standardized approach to visual and interaction design that ensures consistency across the platform. It provides design tokens, component patterns, and usage guidelines that follow industry best practices including Material Design 3, Tailwind CSS conventions, and Design Tokens 2.0 specification.

## Design Philosophy

1. **Consistency**: Use standardized values for colors, spacing, typography, and shadows
2. **Scalability**: Design tokens and components scale from mobile to desktop
3. **Accessibility**: Built-in focus states, color contrast, and semantic HTML
4. **Maintainability**: Single source of truth for all design decisions
5. **Developer Experience**: Simple class names and semantic naming conventions

## Design Tokens

Design tokens are stored in `src/design-tokens/tokens.json` and represent the atomic design decisions of the system. They are categorized into:

### Color System

#### Primitive Colors
Base colors used as the foundation. Available in various shades (50-900):
- **Blue** (`blue-50` to `blue-900`): Primary interactive color
- **Purple** (`purple-50` to `purple-900`): Secondary accent color
- **Slate** (`slate-50` to `slate-900`): Neutral colors for UI
- **Neutral** (`white`, `black`, `transparent`): Basic colors

Usage example:
```css
background-color: #0284c7; /* blue-600 */
```

#### Semantic Colors
Context-aware colors that represent meaning:

**Dark Theme (Default)**:
- `background`: #1a1d2e - Main page background
- `surface`: #252838 - Card and elevated surfaces
- `border`: #313547 - Border and divider lines
- `text.primary`: #f2f4f8 - Main text (98% opacity white)
- `text.secondary`: #cbd5e1 - Secondary text
- `text.tertiary`: #94a3b8 - Tertiary text
- `text.disabled`: #475569 - Disabled state text
- `interactive.primary`: #38bdf8 - Primary interactive elements
- `interactive.primaryHover`: #0ea5e9 - Primary hover state

**Status Colors**:
- `success`: #10b981 - Success state
- `warning`: #f59e0b - Warning state
- `error`: #ef4444 - Error state
- `info`: #3b82f6 - Information state

Usage:
```html
<!-- Using Tailwind classes with design tokens -->
<button class="bg-blue-600 text-white hover:bg-blue-700">
  Click me
</button>

<!-- Using CSS variables -->
<div style="background-color: hsl(var(--background))">
  Content
</div>
```

### Typography

#### Font Families
```json
{
  "sans": "'Noto Sans JP', system-ui, -apple-system, sans-serif",
  "mono": "'Menlo', 'Monaco', 'Courier New', monospace"
}
```

#### Font Sizes (with line-height and letter-spacing)
| Size | Font Size | Line Height | Letter Spacing | Usage |
|------|-----------|-------------|----------------|-------|
| `xs` | 0.75rem (12px) | 1rem | 0.5px | Captions, small labels |
| `sm` | 0.875rem (14px) | 1.25rem | 0px | Secondary text |
| `base` | 1rem (16px) | 1.5rem | 0px | Body text |
| `lg` | 1.125rem (18px) | 1.75rem | 0px | Large body text |
| `xl` | 1.25rem (20px) | 1.75rem | -0.5px | Large headings |
| `2xl` | 1.5rem (24px) | 2rem | -0.5px | Major headings |
| `3xl` | 1.875rem (30px) | 2.25rem | -0.5px | Large sections |
| `4xl` | 2.25rem (36px) | 2.5rem | -1px | Hero titles |
| `5xl` | 3rem (48px) | 3.5rem | -1px | Page titles |
| `6xl` | 3.75rem (60px) | 4.5rem | -1.5px | Hero text |

#### Font Weights
- `regular` (400): Body text
- `medium` (500): Emphasis, buttons
- `semibold` (600): Subheadings
- `bold` (700): Headings

Usage:
```html
<!-- Using Tailwind classes -->
<h1 class="text-6xl font-bold">Page Title</h1>
<p class="text-base font-regular text-gray-600">Body text</p>

<!-- Using component classes -->
<h1 class="text-heading-1">Page Title</h1>
<p class="text-body text-muted">Body text</p>
```

### Spacing System (8-point Grid)

The spacing system uses an 8-point base grid, allowing consistent, scalable spacing:

```
0: 0
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
...and more
```

Named scale for convenience:
| Name | Value | Use Case |
|------|-------|----------|
| `xs` | 0.5rem | Minimal spacing |
| `sm` | 0.75rem | Small gaps |
| `md` | 1rem | Default spacing |
| `lg` | 1.5rem | Large spacing |
| `xl` | 2rem | Extra large |
| `2xl` | 3rem | Section spacing |
| `3xl` | 4rem | Major sections |

Usage:
```html
<!-- Tailwind utilities -->
<div class="p-4 gap-2 mb-8">Content</div>

<!-- Component classes -->
<div class="p-lg gap-md">Content</div>

<!-- CSS variables -->
<div style="padding: var(--spacing-lg); gap: var(--spacing-md)">
  Content
</div>
```

### Border Radius

```
none: 0
sm: 0.25rem (4px)
md: 0.375rem (6px)
base: 0.5rem (8px)
lg: 0.75rem (12px)
xl: 1rem (16px)
2xl: 1.5rem (24px)
3xl: 2rem (32px)
full: 9999px (fully rounded)
```

Usage:
```html
<button class="rounded-lg">Button</button>
<div class="rounded-2xl">Card</div>
```

### Shadows

Shadows follow a subtle-to-dramatic scale:

```
none: none
xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)
```

Usage:
```html
<div class="shadow-base">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
```

### Transitions

Timing functions and durations for smooth animations:

**Durations**:
- `fast`: 150ms - Quick feedback
- `base`: 200ms - Standard transitions
- `slow`: 300ms - Emphasis transitions
- `slower`: 500ms - Deliberate animations

**Timing Functions**:
- `ease-out`: Cubic-bezier(0.4, 0, 0.2, 1) - Exiting/appearing
- `ease-in`: Cubic-bezier(0.4, 0, 1, 1) - Entering/hiding
- `ease-in-out`: Cubic-bezier(0.4, 0, 0.2, 1) - Continuous motion

Usage:
```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Component Classes

Pre-built component patterns using design tokens.

### Buttons

#### Base Button
All buttons inherit from `.btn`:
```html
<button class="btn btn-primary">Primary Button</button>
```

Styles:
- Flexbox centered layout
- 200ms transition
- Proper gap and alignment
- Accessible focus states

#### Button Variants

**Primary** - Main call-to-action:
```html
<button class="btn btn-primary">Primary Action</button>
```

Properties:
- Background: primary color
- Text: white
- Padding: 0.75rem 1.5rem
- Hover: 90% opacity, shadow, -1px transform

**Secondary** - Alternative action:
```html
<button class="btn btn-secondary">Secondary Action</button>
```

Properties:
- Background: card color
- Border: 1px solid border color
- Text: foreground color
- Hover: darker background, shadow

**Outline** - Tertiary action:
```html
<button class="btn btn-outline">Outline Button</button>
```

Properties:
- Background: transparent
- Border: 2px solid primary
- Text: primary color
- Hover: primary tinted background

#### Button Sizes

```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Normal (default)</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

#### Base Card
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

Properties:
- Background: card color
- Border: 1px solid
- Padding: 1.5rem
- Shadow: base
- Rounded: lg
- Hover: shadow-md, border-primary/50

#### Card Variants

**Elevated** - Floating appearance with gradient:
```html
<div class="card card-elevated">
  Content with elevated appearance
</div>
```

**Compact** - Reduced padding:
```html
<div class="card card-compact">
  Compact card content
</div>
```

**Spacious** - Extra padding:
```html
<div class="card card-spacious">
  Spacious card content
</div>
```

### Typography

#### Heading Classes
```html
<h1 class="text-heading-1">Page Title</h1>
<h2 class="text-heading-2">Section Title</h2>
<h3 class="text-heading-3">Subsection Title</h3>
<h4 class="text-heading-4">Small Heading</h4>
```

#### Body Text Classes
```html
<p class="text-body">Regular body text</p>
<p class="text-body-sm">Smaller body text</p>
<p class="text-caption">Caption text (small, semibold)</p>
```

#### Text Modifiers
```html
<p class="text-muted">Secondary/muted text</p>
<p class="text-primary">Primary color text</p>
```

### Layout Utilities

#### Section Padding
```html
<section class="section-padding">Default padding</section>
<section class="section-padding-lg">Large padding</section>
```

#### Container
```html
<div class="container-max-width">Centered content with max-width</div>
```

### Spacing Utilities

#### Gap (for flexbox/grid)
```html
<div class="flex gap-md">Flex with medium gap</div>
<div class="grid gap-lg">Grid with large gap</div>
```

Options: `gap-xs`, `gap-sm`, `gap-md`, `gap-lg`, `gap-xl`

#### Padding
```html
<div class="p-lg">Large padding on all sides</div>
```

Options: `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`

#### Border Radius
```html
<div class="rounded-lg">Rounded corners</div>
<div class="rounded-2xl">More rounded</div>
```

#### Shadows
```html
<div class="shadow-base">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
```

### Forms

#### Input Base
```html
<input class="input-base" type="text" placeholder="Enter text...">
```

Properties:
- Full width
- Background: background color
- Border: 1px solid
- Padding: 1rem
- Font: inherit
- Focus: primary border + primary shadow
- Placeholder: muted color

## Implementation Guidelines

### Do's ✅

1. **Use design tokens consistently**
   ```html
   <!-- Good -->
   <button class="btn btn-primary">Action</button>
   ```

2. **Follow the 8-point grid**
   ```html
   <!-- Good: using multiples of 8 -->
   <div class="p-lg gap-md">Content</div>
   ```

3. **Use semantic color names**
   ```html
   <!-- Good -->
   <div class="text-primary">Important text</div>
   ```

4. **Combine component classes for variations**
   ```html
   <!-- Good: base + variant -->
   <button class="btn btn-primary btn-lg">Large primary</button>
   ```

5. **Use CSS variables for dynamic styling**
   ```css
   /* Good: respects theme changes */
   background-color: hsl(var(--primary));
   ```

### Don'ts ❌

1. **Don't use arbitrary pixel values**
   ```html
   <!-- Bad -->
   <div class="p-[17px]">Wrong padding</div>
   ```

2. **Don't mix Tailwind hardcoded values with design tokens**
   ```html
   <!-- Bad -->
   <div class="text-blue-500">Wrong color system</div>
   ```

3. **Don't create inline styles without design token equivalents**
   ```html
   <!-- Bad -->
   <div style="padding: 13px; border-radius: 7px;">Wrong</div>
   ```

4. **Don't duplicate component patterns**
   ```html
   <!-- Bad: creating new card class -->
   <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
     Content
   </div>

   <!-- Good: use existing card class -->
   <div class="card">Content</div>
   ```

5. **Don't hardcode colors in components**
   ```jsx
   // Bad
   <button style={{ backgroundColor: '#0284c7' }}>Action</button>

   // Good
   <button className="btn btn-primary">Action</button>
   ```

## Maintaining the Design System

### Adding New Design Tokens

1. Update `src/design-tokens/tokens.json` with the new token
2. Run `npm run build` to regenerate Tailwind config
3. Update this documentation with the new token
4. Use the token in components

### Creating New Component Classes

1. Add the CSS class to `src/app/globals.css` in the component-level section
2. Use design tokens and CSS variables (no hardcoded values)
3. Include hover/focus states for interactive elements
4. Document the component usage in this file

### Updating Tailwind Configuration

The `tailwind.config.js` automatically reads from `src/design-tokens/tokens.json`. Any updates to the tokens file will be reflected in Tailwind utilities after rebuilding.

## Migration Guide

If you're transitioning existing components to use the design system:

1. **Colors**: Replace hardcoded hex values with design token color classes
2. **Spacing**: Replace arbitrary padding/margin with token-based classes
3. **Typography**: Use heading/body component classes instead of manual font sizing
4. **Components**: Replace inline styles with component classes (`.card`, `.btn`, etc.)

Example migration:
```jsx
// Before
<div style={{
  padding: '24px',
  backgroundColor: '#252838',
  borderRadius: '12px',
  boxShadow: '0 4px 6px...'
}}>
  <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Title</h2>
  <p style={{ fontSize: '14px', color: '#cbd5e1' }}>Description</p>
  <button style={{
    padding: '12px 24px',
    backgroundColor: '#0284c7',
    color: 'white',
    borderRadius: '12px'
  }}>
    Click
  </button>
</div>

// After
<div class="card">
  <h2 class="text-heading-4">Title</h2>
  <p class="text-body-sm text-muted">Description</p>
  <button class="btn btn-primary">Click</button>
</div>
```

## Resources

- [Design Tokens 2.0 Specification](https://tr.designtokens.org/format/)
- [Material Design 3](https://m3.material.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design System Best Practices](https://www.designsystems.com/)

## Questions & Feedback

When in doubt about design decisions, refer to:
1. The design tokens file (`src/design-tokens/tokens.json`)
2. This documentation
3. Material Design 3 guidelines
4. Existing component implementations

For suggestions or updates to the design system, please discuss with the team and update this documentation accordingly.
