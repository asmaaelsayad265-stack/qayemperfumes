# Database Schema (ERD) - MySQL - قَيَّم للعطور

> هذا ERD مبدئي لتحديد الكيانات والعلاقات قبل تنفيذ Laravel Migrations.

## الكيانات الأساسية

### users
- id (PK)
- name
- email (UNIQUE)
- password_hash
- role (customer|admin)
- phone
- created_at

### categories
- id (PK)
- name_ar
- name_en
- slug (UNIQUE)
- type (men|women|summer|winter|best|special)
- sort_order

### products
- id (PK)
- name_ar
- name_en
- slug (UNIQUE)
- description_ar
- description_en
- price_base (اختياري)
- is_active
- is_special
- is_best_seller
- category_primary_id (FK -> categories.id) 

### product_images
- id (PK)
- product_id (FK -> products.id)
- url
- sort_order

### product_variants (المقاسات/الأحجام)
- id (PK)
- product_id (FK -> products.id)
- size_ml
- sku (UNIQUE لكل variant)
- price (سعر Variant)
- is_active

### product_notes (Top/Middle/Base)
- id (PK)
- product_id (FK -> products.id)
- note_type (top|middle|base)
- name_ar
- name_en
- sort_order

### reviews
- id (PK)
- product_id (FK)
- user_id (FK -> users.id)
- rating (1..5)
- title
- body
- is_approved
- created_at

### wishlists
- id (PK)
- user_id (FK -> users.id)
- created_at

### wishlist_items
- id (PK)
- wishlist_id (FK -> wishlists.id)
- product_id (FK -> products.id)

### carts (أو cart header)
- id (PK)
- user_id (FK -> users.id)
- status (active|converted)
- created_at

### cart_items
- id (PK)
- cart_id (FK -> carts.id)
- product_variant_id (FK -> product_variants.id)
- qty

### inventory
- id (PK)
- product_variant_id (FK -> product_variants.id)
- quantity_on_hand
- updated_at

### orders
- id (PK)
- user_id (FK -> users.id)
- order_number (UNIQUE)
- status (new|preparing|shipped|completed|canceled)
- total_amount
- currency (EGP/...) 
- shipping_phone
- notes
- created_at

### order_items
- id (PK)
- order_id (FK -> orders.id)
- product_variant_id (FK -> product_variants.id)
- qty
- unit_price

## علاقات مختصرة
- categories (1) -> (many) products
- products (1) -> (many) product_images
- products (1) -> (many) product_variants
- products (1) -> (many) product_notes
- products (1) -> (many) reviews
- users (1) -> (1) wishlists (أو أكثر حسب السياسة)
- wishlists (1) -> (many) wishlist_items
- users (1) -> (many) carts
- carts (1) -> (many) cart_items
- product_variants (1) -> (1) inventory (حسب التصميم)
- users (1) -> (many) orders
- orders (1) -> (many) order_items

