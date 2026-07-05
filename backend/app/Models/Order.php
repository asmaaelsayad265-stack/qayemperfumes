<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
  protected $fillable = [
    'order_number',
    'customer_id',
    'total',
    'status',
    'payment_status',
    'payment_method',
    'shipping_address',
    'customer_email',
    'customer_phone',
    'notes',
  ];

  protected function casts(): array
  {
    return [
      'total' => 'decimal:2',
    ];
  }

  public function customer(): BelongsTo
  {
    return $this->belongsTo(Customer::class);
  }

  public function items(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }
}