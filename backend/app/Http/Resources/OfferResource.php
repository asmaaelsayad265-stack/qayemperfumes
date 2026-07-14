<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'product_id' => $this->product_id,
      'discount_type' => $this->discount_type,
      'discount_value' => $this->discount_value,
      'starts_at' => $this->starts_at,
      'expires_at' => $this->expires_at,
      'is_active' => $this->is_active,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'product' => $this->when($this->product, fn () => new ProductResource($this->product)),
    ];
  }
}