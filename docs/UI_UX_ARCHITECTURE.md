# UI/UX Architecture - Luxury Black/Gold + RTL

## 1) المبادئ
- Luxury Black/Gold theme
- RTL support افتراضي (لغة عربية)
- UX سينمائي: انتقالات ناعمة وعمق بصري
- تصميم Minimal Luxury مع عناصر مستوحاة من التراث المصري/النوبي

## 2) Design Tokens (مفاهيم)
- Background: `#050505` / `#0B0B0B`
- Surface: `#111111`
- Gold: `#C8A24A`
- Text: أبيض/رمادي فاتح
- Borders: ذهبي خافت أو رمادي داكن
- Shadows: ضبابية خفيفة (لا مبالغة)

## 3) Layoutات
- Header/Footer ثابتة/ديناميكية (مع دعم RTL)
- صفحات Product تتضمن:
  - ProductGallery (صور متعددة + thumbnails)
  - Ingredients Notes (Top/Middle/Base)
  - Size/Price selector
  - Reviews section
  - Availability

## 4) مكونات أساسية
- `ProductCard` (hover reveal)
- `ProductGallery` (lightbox)
- `ReviewStars`
- `FilterBar` (category + price range + sort)
- `CartDrawer` أو `/cart` page
- `AdminLayout`:
  - Sidebar (ملاحة)
  - Topbar (مستخدم + خروج)

## 5) الأنيميشن والانتقالات
- Fade/Translate خفيف عند تغيير الأقسام
- Gold shimmer للـ CTA
- skeleton loading للبطاقات/المنتجات أثناء الجلب

## 6) Accessibility
- تباين عالي
- مسارات واضحة للتنقل في RTL
- تمييز states للأزرار (focus/active/disabled)

