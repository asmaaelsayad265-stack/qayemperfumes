<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $rows = [
            ['name_ar' => 'عود قيم الملكي', 'name_en' => 'Royal Oud', 'slug' => 'royal-oud', 'price' => 850, 'original_price' => 1000, 'category_slug' => 'oud', 'status' => 'active', 'season' => 'all', 'gender' => 'unisex', 'is_featured' => true, 'is_best_seller' => true, 'image' => '/images/products/royal-oud.jpg'],
            ['name_ar' => 'مسك الليل الأبيض', 'name_en' => 'White Musk', 'slug' => 'white-night-musk', 'price' => 650, 'original_price' => null, 'category_slug' => 'musk', 'status' => 'active', 'season' => 'winter', 'gender' => 'unisex', 'is_featured' => true, 'is_best_seller' => true, 'image' => '/images/products/white-musk.jpg'],
            ['name_ar' => 'ورد دمشق الملكي', 'name_en' => 'Damascus Rose', 'slug' => 'damascus-rose', 'price' => 420, 'original_price' => 500, 'category_slug' => 'rose', 'status' => 'active', 'season' => 'spring', 'gender' => 'women', 'is_featured' => true, 'is_best_seller' => false, 'is_limited_edition' => true, 'image' => '/images/products/damascus-rose.jpg'],
            ['name_ar' => 'مانجو استوائي', 'name_en' => 'Tropical Mango', 'slug' => 'tropical-mango', 'price' => 380, 'original_price' => null, 'category_slug' => 'fruity', 'status' => 'active', 'season' => 'summer', 'gender' => 'unisex', 'is_featured' => false, 'is_best_seller' => true, 'image' => '/images/products/tropical-mango.jpg'],
            ['name_ar' => 'خشب الصندل الذهبي', 'name_en' => 'Golden Sandalwood', 'slug' => 'golden-sandalwood', 'price' => 720, 'original_price' => 850, 'category_slug' => 'woody', 'status' => 'active', 'season' => 'autumn', 'gender' => 'men', 'is_featured' => true, 'is_best_seller' => true, 'image' => '/images/products/golden-sandalwood.jpg'],
            ['name_ar' => 'المسك الرجالي الفاخر', 'name_en' => 'Luxury Men Musk', 'slug' => 'luxury-men-musk', 'price' => 950, 'original_price' => null, 'category_slug' => 'musk', 'status' => 'active', 'season' => 'all', 'gender' => 'men', 'is_featured' => true, 'is_best_seller' => false, 'is_limited_edition' => true, 'image' => '/images/products/luxury-musk.jpg'],
        ];

        foreach ($rows as $row) {
            $categoryId = optional($categories->firstWhere('slug', $row['category_slug']))->id;
            unset($row['category_slug']);

            $product = Product::updateOrCreate(['slug' => $row['slug']], array_merge($row, ['category_id' => $categoryId]));

            Inventory::updateOrCreate([
                'product_id' => $product->id,
                'sku' => 'QY-' . Str::upper(Str::replace('-', '', $product->slug)) . '-100',
            ], [
                'variant' => '100ml',
                'quantity' => random_int(5, 50),
                'reserved' => 0,
                'low_stock_threshold' => 5,
                'status' => 'in_stock',
                'location' => 'Riyadh Warehouse',
            ]);

            Review::updateOrCreate([
                'product_id' => $product->id,
                'customer_name' => 'عميل قيم',
                'customer_email' => 'client@qayem.test',
            ], [
                'customer_id' => null,
                'rating' => random_int(4, 5),
                'body' => 'عطر رائع وثبات ممتاز، أنصح به بشدة.',
                'is_approved' => true,
            ]);
        }
    }
}
