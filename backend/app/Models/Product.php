<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
  protected $fillable = [
    'name_ar', 'name_en', 'slug', 'description_ar', 'description_en',
    'price', 'original_price', 'category_id', 'status',
    'season', 'gender',
    'is_featured', 'is_best_seller', 'is_limited_edition', 'image',
  ];

  protected function casts(): array
  {
    return [
      'price' => 'decimal:2',
      'original_price' => 'decimal:2',
      'is_featured' => 'boolean',
      'is_best_seller' => 'boolean',
      'is_limited_edition' => 'boolean',
    ];
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function images(): HasMany
  {
    return $this->hasMany(ProductImage::class);
  }

  public function notes(): HasMany
  {
    return $this->hasMany(ProductNote::class);
  }

  public function reviews(): HasMany
  {
    return $this->hasMany(Review::class);
  }

  public function inventory(): HasOne
  {
    return $this->hasOne(Inventory::class);
  }
}
