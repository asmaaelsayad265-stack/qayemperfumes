<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'product_id' => $this->product_id,
      'sku' => $this->sku,
      'variant' => $this->variant,
      'quantity' => $this->quantity,
      'reserved' => $this->reserved,
      'low_stock_threshold' => $this->low_stock_threshold,
      'location' => $this->location,
      'status' => $this->status,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}