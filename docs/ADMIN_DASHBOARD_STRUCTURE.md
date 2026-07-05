# Admin Dashboard Structure - مسارات وهوية واجهة

> لوحة الإدارة مدمجة داخل نفس تطبيق Next.js تحت `/admin`.

## 1) Admin Layout
- Sidebar:
  - Dashboard
  - Products
  - Categories
  - Orders
  - Inventory
  - Customers
  - Analytics
  - Settings
- Topbar:
  - اسم/صورة المستخدم (Admin)
  - زر Logout

## 2) Pages & UI Sections
### `/admin`
- KPI Tiles (عدد المنتجات/الطلبات/الإيرادات - حسب البيانات لاحقًا)
- جدول أفضل المنتجات

### `/admin/products`
- Table: name, price, stock, status, actions
- Filters: category, status, search

### `/admin/products/create`
- Form: متغيرات الحجم/السعر
- رفع صور متعددة
- مكونات Top/Middle/Base
- إعداد توفر/حالة المنتج

### `/admin/products/[id]`
- نفس form مع prefilled data

### `/admin/categories`
- CRUD + slug validation

### `/admin/orders`
- List + حالات الطلب

### `/admin/orders/[id]`
- تفاصيل الطلب
- تغيير الحالة (new -> preparing -> shipped -> completed | canceled)

### `/admin/inventory`
- Grid: variant -> quantity_on_hand
- Save changes

### `/admin/customers`
- Users list + عدد الطلبات

### `/admin/analytics`
- best sellers
- (اختياري) زيارات/طلبات إذا تم تتبعها

### `/admin/settings`
- إعدادات أساسية (مثل currency/whatsapp links - لاحقًا)

