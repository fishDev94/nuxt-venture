# Project Documentation

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Typography System](#typography-system)
  - [Headings](#headings)
  - [Sub-headings](#sub-headings)
  - [Body Text](#body-text)
  - [Style Specifications](#style-specifications)
  - [Implementation Example](#implementation-example)
  - [Customization](#customization)
- [Responsive Mixins](#responsive-mixins)
  - [Breakpoint Variables](#breakpoint-variables)
  - [start-from Mixin](#start-from-mixin)
  - [Examples](#examples)
- [Technical Architecture Decisions](#technical-choices)

---

# Getting Started <a id="getting-started"></a>

**Prerequisites** <a id="prerequisites"></a>

- Node.js (v20 or later recommended)
- pnpm (install globally via npm install -g pnpm)

**Installation** <a id="installation"></a>

- Clone the repository
- Install dependencies:

```bash
pnpm install
```

**Development** <a id="development"></a>

To start the development server:

```bash
pnpm dev
```

# Typography System <a id="typography-system"></a>

This project implements a modular typography system using Sass mixins and maps to maintain consistent text styles.

## Headings <a id="headings"></a>

Use for primary titles and section headers:

```scss
@include heading(1); // 48px, bold
@include heading(2); // 40px, bold
@include heading(3); // 32px, bold
```

## Sub-headings <a id="sub-headings"></a>

For secondary titles with varied weights:

```scss
@include sub-heading(1); // 40px, semibold
@include sub-heading(4); // 28px, medium
```

## Body Text <a id="body-text"></a>

Standard paragraph styles:

```scss
@include body(1); // 20px, regular
@include body(3); // 16px, regular
@include body(6); // 12px, regular
```

## Style Specifications <a id="style-specifications"></a>

### Headings

| Level | Size | Weight | Line Height |
| ----- | ---- | ------ | ----------- |
| 1     | 48px | Bold   | 110%        |
| 2     | 40px | Bold   | 110%        |
| 3     | 32px | Bold   | 110%        |

### Sub-headings

| Level | Size | Weight | Line Height |
| ----- | ---- | ------ | ----------- |
| 1     | 40px | 600    | 115%        |
| 4     | 28px | 500    | 120%        |

### Body Text

| Level | Size | Weight | Line Height |
| ----- | ---- | ------ | ----------- |
| 1     | 20px | 400    | 140%        |
| 3     | 16px | 400    | 140%        |
| 6     | 12px | 400    | 130%        |

## Implementation Example <a id="implementation-example"></a>

```scss
.my-heading {
  @include heading(2);
  color: $primary;
}

.article-text {
  @include body(3);
  margin-bottom: 1em;
}
```

## Customization <a id="customization"></a>

Override the default variables in your Sass:

```scss
$heading-map: (
  1: (
    "size": 52px,
    "weight": 700,
  ),
);
```

# Responsive Mixins <a id="responsive-mixins"></a>

responsive mixins for handling media queries across different device breakpoints.

## Breakpoint Variables <a id="breakpoint-variables"></a>

| Variable          | Value  | Device Type       |
| ----------------- | ------ | ----------------- |
| `$phone`          | 360px  | Mobile phones     |
| `$tablet`         | 744px  | Tablets           |
| `$medium-desktop` | 1024px | Small desktops    |
| `$large-desktop`  | 1440px | Standard desktops |

**`start-from` Mixin** <a id="start-from-mixin"></a>

Creates responsive media queries with optional orientation constraints.

**Usage**

```scss
@include start-from($media, $orientation) {
  // Your styles here
}
```

_Parameters_

- `$media`: Breakpoint name (phone, tablet, medium-desktop, large-desktop)
  `$orientation` (optional): 'portrait' or 'landscape'

## Examples <a id="examples"></a>

**Basic usage:**

```scss
.element {
  @include start-from(tablet) {
    font-size: 18px;
  }
}
```

**With orientation:**

```scss
.element {
  @include start-from(tablet, landscape) {
    width: 50%;
  }
}
```

**Phone specific styles:**

```scss
.element {
  @include start-from(phone) {
    display: block;
  }
}
```

**Large desktop styles:**

```scss
.element {
  @include start-from(large-desktop) {
    padding: 2rem;
  }
}
```

# Technical Architecture Decisions <a id="technical-choices"></a>

## UI Framework Optimization

- Nuxt UI Integration:
  Implemented Nuxt UI to accelerate development with:
  - 50+ pre-built accessible components
  - Configurable design tokens
  - Reduced custom CSS by ~40% compared to pure Tailwind implementation

## Component Architecture

```bash
components/
├── ui/
│   ├── NavBar.vue
│   ├── NvCard.vue
│   └── ...
├── skeleton/
│   ├── NvCard.vue # with imports: <SkeletonNvCard />
│   └── ...

```

**Rationale:**

- Clear separation between:
  - UI Components: Stateless, reusable (props-driven)
  - Skeleton States: Specialized loading UIs

## State Management

**Cart Implementation:**

```ts
export const useCart = () => {
  const cart = useCookie<CartItem[]>("cart", {
    default: () => [],
    watch: true,
    maxAge: ONE_WEEK_IN_SECONDS,
  });
  // ...
};
```

**Key Decisions:**

1. Server-Compatible State:
   Uses useCookie instead of localStorage to:

   - Prevent hydration mismatches
   - Enable SSR support
   - Maintain state across refreshes without client-side flickering

2. Optimized Performance:

   - Watch mode enabled for reactive updates
   - 1-week expiration balances UX and data freshness

3. Type Safety:
   Strict TypeScript interfaces prevent invalid cart states

## Scroll Performance Optimization

```ts
if ("onscrollend" in window) {
  element.value.addEventListener("scrollend", updateScrollValue);
} else {
  element.value.addEventListener("scroll", scrollEnd); // Fallback
}

const scrollEnd = () => {
  clearTimeout(window.scrollEndTimer);
  window.scrollEndTimer = setTimeout(updateScrollValue, DEBOUNCE_TIME);
};
```

**Why This Matters:**

1. Modern Browser Support:
   Uses native scrollend event where available (Chrome 114+, Firefox 109+)

2. Legacy Browser Fallback:
   Debounced `scroll` event for Safari/older browsers:

   - 100ms debounce time reduces calls by ~90%
   - Prevents memory leaks with proper cleanup

3. Performance Impact:
   Reduces unnecessary layout recalculations
