<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inventory extends Model
{
  protected $fillable = [
    'product_id',
    'sku',
    'variant',
    'quantity',
    'reserved',
    'low_stock_threshold',
    'location',
    'status',
  ];

  protected function casts(): array
  {
    return [
      'quantity' => 'integer',
      'reserved' => 'integer',
      'low_stock_threshold' => 'integer',
    ];
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
