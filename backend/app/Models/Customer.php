<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
  protected $fillable = [
    'name',
    'email',
    'phone',
    'orders_count',
    'total_spent',
    'is_vip',
    'last_order_at',
  ];

  protected function casts(): array
  {
    return [
      'total_spent' => 'decimal:2',
      'is_vip' => 'boolean',
      'last_order_at' => 'datetime',
    ];
  }

  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }

  public function reviews(): HasMany
  {
    return $this->hasMany(Review::class);
  }
}
