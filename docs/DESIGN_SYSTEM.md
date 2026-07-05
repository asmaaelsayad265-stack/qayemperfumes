# Design System - قَيَّم للعطور

## 1) Theme
- Luxury Black/Gold
- RTL افتراضي

### Colors
- `--bg-0`: #050505
- `--bg-1`: #0B0B0B
- `--surface`: #111111
- `--gold`: #C8A24A
- `--text`: #F5F5F5
- `--muted`: #A0A0A0

### Typography
- خطوط عربية أنيقة (سيتم اختيارها لاحقًا عند إنشاء المشروع)
- قواعد spacing تدعم القراءة من اليمين لليسار

## 2) Components Styling
- Buttons:
  - Primary: Gold background + text black
  - Secondary: border gold/transparent
- Cards:
  - surface bg + gold border/shine عند hover
- Tables (Admin):
  - خطوط داكنة + highlight للـ hover

## 3) Motion
- duration 200-350ms
- easing: `cubic-bezier(...)` ناعم
- gold shimmer على CTA عند الوصول/التحويم

## 4) Responsiveness
- Mobile-first
- grid يتحول من 1 column إلى 2 ثم 3 حسب العرض
- admin tables: pagination/responsive columns

