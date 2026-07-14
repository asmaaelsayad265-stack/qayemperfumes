<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name_ar' => 'عود',
                'name_en' => 'Oud',
                'slug' => 'oud',
                'description_ar' => 'مجموعة فاخرة من عطور العود الشرقي الأصيل',
                'description_en' => 'Luxurious collection of authentic oriental oud fragrances',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name_ar' => 'مسك',
                'name_en' => 'Musk',
                'slug' => 'musk',
                'description_ar' => 'عطور المسك النبيل والأصيل',
                'description_en' => 'Noble and authentic musk fragrances',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name_ar' => 'ورود',
                'name_en' => 'Rose',
                'slug' => 'rose',
                'description_ar' => 'مجموعة الورد الدمشقي والطبيعي',
                'description_en' => 'Collection of Damascus and natural rose fragrances',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name_ar' => 'فواكه',
                'name_en' => 'Fruity',
                'slug' => 'fruity',
                'description_ar' => 'عطور منعشة بنكهات الفواكه الاستوائية',
                'description_en' => 'Fresh fragrances with exotic fruit notes',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name_ar' => 'خشبية',
                'name_en' => 'Woody',
                'slug' => 'woody',
                'description_ar' => 'عطور خشبية دافئة ورجالية',
                'description_en' => 'Warm woody fragrances for men',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
