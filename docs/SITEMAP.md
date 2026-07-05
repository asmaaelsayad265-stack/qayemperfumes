# Sitemap - قَيَّم للعطور (Luxury Perfume Platform)

> الموقع يحتوي على واجهة عملاء + لوحة إدارة مدمجة تحت نفس تطبيق Next.js على المسار `/admin`.

## Website (Customer)
- `/` : الصفحة الرئيسية
- `/about` : قصة البراند

### Categories
- `/collections/men` : العطور الرجالية
- `/collections/women` : العطور النسائية
- `/collections/summer` : العطور الصيفية
- `/collections/winter` : العطور الشتوية
- `/collections/best-sellers` : الأكثر مبيعًا
- `/collections/special-editions` : الإصدارات الخاصة

### Product
- `/products/[slug]` : تفاصيل المنتج

### Commerce
- `/wishlist` : المفضلة
- `/cart` : سلة التسوق
- `/checkout` : إتمام الطلب
- (اختياري حسب السياسات)
  - `/orders` : حالة الطلبات

### Content/Trust
- `/reviews` : مركز التقييمات (اختياري)
- `/contact` : تواصل معنا (واتساب/إنستجرام/فيسبوك/تيك توك)

## Admin (/admin)
- `/admin` : Dashboard
- `/admin/products` : إدارة المنتجات (CRUD)
- `/admin/products/create` : إنشاء منتج
- `/admin/products/[id]` : تعديل منتج
- `/admin/categories` : إدارة التصنيفات (CRUD)
- `/admin/orders` : إدارة الطلبات (قائمة)
- `/admin/orders/[id]` : تفاصيل الطلب + تغيير الحالة
- `/admin/inventory` : إدارة المخزون/الكميات
- `/admin/customers` : إدارة العملاء
- `/admin/analytics` : الإحصائيات + المنتجات الأكثر مبيعًا
- `/admin/settings` : إعدادات الموقع (حد أدنى)

