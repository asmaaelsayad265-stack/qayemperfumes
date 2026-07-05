<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'phone' => $this->phone,
      'orders_count' => $this->orders_count,
      'total_spent' => $this->total_spent,
      'is_vip' => $this->is_vip,
      'last_order_at' => $this->last_order_at,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}