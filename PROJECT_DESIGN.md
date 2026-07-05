# تصميم مشروع قَيَّم للعطور (Luxury Perfume Platform)

## 1) هيكلة مجلد المشروع (مقترحة)
> سيتم تنفيذها بعد موافقة الخطّة (المرحلة التالية).

- `website/` : Next.js + Tailwind + TypeScript
  - `app/` : صفحات App Router
  - `components/` : عناصر واجهة
  - `features/` : منطق واجهات مثل cart/wishlist/products
  - `lib/` : helpers (API client, utils)
  - `styles/` : ثيمات/خطوط/أنيميشن RTL
- `backend/` : Laravel API
  - `app/Http/Controllers/` : Controllers للمنتجات/الطلبات/... 
  - `app/Models/` : Models
  - `database/migrations/` : schema
  - `routes/api.php` : routes

## 2) Sitemap (Website + Admin)
- `/` : الصفحة الرئيسية
- `/about` : قصة البراند
- `/collections/men` : العطور الرجالية
- `/collections/women` : العطور النسائية
- `/collections/summer` : العطور الصيفية
- `/collections/winter` : العطور الشتوية
- `/collections/best-sellers` : الأكثر مبيعًا
- `/collections/special-editions` : الإصدارات الخاصة
- `/products/[slug]` : تفاصيل منتج (صور/مكونات/مقاسات/سعر/توفر/مراجعات)
- `/wishlist` : المفضلة (عند العميل)
- `/cart` : سلة التسوق
- `/checkout` : إتمام الطلب (حجز/دفع حسب سياسة المشروع)
- `/orders` : حالة الطلبات (اختياري لو كانت مطلوبة)
- `/reviews` : مركز المراجعات (اختياري)
- `/contact` : تواصل معنا (WhatsApp/Instagram/Facebook/TikTok)

**Admin (دمج داخل نفس Next.js تحت /admin):**
- `/admin` : Dashboard
- `/admin/products` : Products
- `/admin/products/[id]` : Edit product
- `/admin/products/create` : Create product
- `/admin/categories` : Categories
- `/admin/orders` : Orders list
- `/admin/orders/[id]` : Order details + status change
- `/admin/inventory` : Inventory management
- `/admin/customers` : Customers
- `/admin/analytics` : Analytics & best sellers
- `/admin/settings` : Settings (حد أدنى)

## 3) Database Schema (MySQL) - مخطط مبدئي
> سيتم تنقيحه بعد موافقة الخطّة.

- `users`
  - id, name, email, password_hash, role (customer/admin), phone, created_at
- `categories`
  - id, name_ar, name_en, slug, type (men/women/summer/winter/best/special), sort_order
- `products`
  - id, name_ar, name_en, slug, description_ar, description_en, price_base, is_active, category_primary_id, is_special, is_best_seller
- `product_images`
  - id, product_id, url, sort_order
- `product_variants` (المقاسات/الأحجام)
  - id, product_id, size_ml, sku, price, is_active
- `product_notes` (Top/Middle/Base)
  - id, product_id, note_type (top/middle/base), name_ar, name_en, sort_order
- `reviews`
  - id, product_id, user_id, rating (1-5), title, body, is_approved, created_at
- `wishlists`
  - id, user_id, created_at
- `wishlist_items`
  - id, wishlist_id, product_id
- `carts` (أو cart_items مباشرة حسب اختيار)
  - id, user_id, status (active/converted)
- `cart_items`
  - id, cart_id, product_variant_id, qty
- `inventory`
  - id, product_variant_id, quantity_on_hand
- `orders`
  - id, user_id, order_number, status (new/preparing/shipped/completed/canceled), total_amount, currency, shipping_phone, notes, created_at
- `order_items`
  - id, order_id, product_variant_id, qty, unit_price

## 4) UI/UX Architecture (Luxury Black/Gold + RTL)
- نظام RTL افتراضي
- Tailwind theme:
  - `background: #050505` / `#0B0B0B`
  - gold: `#C8A24A`
  - surface panels: `#111`
- مكونات مشتركة:
  - `Header` (روابط + بحث)
  - `Footer` (تواصل + روابط اجتماعية)
  - `ProductCard` (hover reveal)
  - `ProductGallery` (thumbnails + lightbox)
  - `ReviewStars`
  - `AdminLayout` (Sidebar + topbar)
- رسوم/أنيميشن:
  - fades + subtle translate + gold shimmer لعنصر CTA
- إدارة الخرائط:
  - فلاتر (category + price range + sort)
  - Search API في Laravel

## 5) Admin Dashboard Structure
- `AdminLayout`
  - Sidebar: Dashboard / Products / Categories / Orders / Inventory / Customers / Analytics / Settings
  - Topbar: user + logout
- صفحات:
  - Dashboard: KPI tiles + chart best sellers
  - Products:
    - table (name, price, stock, status)
    - create/edit/delete
  - Categories:
    - CRUD + slug validation
  - Orders:
    - list + details + status update (new -> preparing -> shipped -> completed | canceled)
  - Inventory:
    - edit quantities per variant
  - Customers:
    - list + view orders count
  - Analytics:
    - best-selling products + visits/orders stats (opt-in)


