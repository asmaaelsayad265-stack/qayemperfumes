<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'قَيَّم للعطور', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'عطور فاخرة بتجربة عربية راقية', 'group' => 'general'],
            ['key' => 'contact_phone', 'value' => '+966500000000', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@qayem-perfumes.example', 'group' => 'contact'],
            ['key' => 'currency', 'value' => 'SAR', 'group' => 'general'],
            ['key' => 'tax_rate', 'value' => '0.15', 'group' => 'general'],
            ['key' => 'free_shipping_threshold', 'value' => '300', 'group' => 'shipping'],
            ['key' => 'default_shipping_fee', 'value' => '25', 'group' => 'shipping'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
