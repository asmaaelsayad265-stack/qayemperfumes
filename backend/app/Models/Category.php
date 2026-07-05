<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
  protected $fillable = [
    'name_ar', 'name_en', 'slug', 'description_ar', 'description_en',
    'image', 'sort_order', 'is_active',
  ];

  protected function casts(): array
  {
    return ['is_active' => 'boolean'];
  }

  public function products(): HasMany
  {
    return $this->hasMany(Product::class);
  }
}
