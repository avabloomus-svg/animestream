# Design Brief: Anime Streaming Platform

## Tone & Differentiation
Minimalist premium dark streaming platform. Brutalist typography, clean card layouts. Monochrome grayscale — no accent colors. Interactive states via opacity, shadow, and scale.

## Color Palette (Dark Mode Only)
| Token | OKLCH | Usage |
|-------|-------|-------|
| background | 0.12 0 0 | Page background — pitch black |
| card | 0.18 0 0 | Surface layers, video cards |
| foreground | 0.95 0 0 | Text, body copy |
| primary | 0.55 0 0 | Buttons, interactive elements |
| secondary | 0.25 0 0 | Secondary UI, borders |
| border | 0.25 0 0 | Dividers, subtle separators |
| destructive | 0.55 0.18 25 | Delete actions (admin) |
| muted | 0.25 0 0 | Disabled states, secondary text |

## Typography
- **Display**: General Sans (modern, geometric, streaming aesthetic)
- **Body**: DM Sans (clean, readable, tech-forward)
- **Mono**: JetBrains Mono (admin tables, data)

## Structural Zones
| Zone | Background | Border | Detail |
|------|-----------|--------|--------|
| Header | `bg-card` | `border-b border-secondary` | Navigation anchor |
| Main content | `bg-background` | — | Clean canvas |
| Video cards | `bg-card` | — | Hover: shadow-card, opacity-90 |
| Admin panel | `bg-background` | — | Table-based, high density |
| Footer | `bg-background` | `border-t border-secondary` | Minimal text |

## Component Patterns
- **Cards**: `rounded-lg shadow-card hover:shadow-elevated transition-smooth`
- **Buttons**: `button-secondary` for primary actions, text-only for secondary
- **Tables**: `admin-table` class with alternating row hover states
- **Hover states**: Scale + shadow lift, never color change

## Motion
- **Default transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Card hover**: Shadow elevation + subtle scale (1.02x)
- **No animations**: Page load is instant; motion is interaction-driven only

## Constraints
- Grayscale ONLY — all colors use `L C H` values with `C = 0` (except destructive)
- No gradients, no accent colors, no color accents
- Radius: `0.5rem` for all rounded elements
- Shadow hierarchy: `shadow-card` for floating content, `shadow-elevated` for modals

## Signature Detail
Pure grayscale with no hue information. Depth through layered opacity and shadows. Technical, premium, focused on content (video grid). Admin panel inherits dark theme for consistency.
