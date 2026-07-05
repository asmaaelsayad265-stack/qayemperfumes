<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'order_number' => $this->order_number,
      'customer_id' => $this->customer_id,
      'total' => $this->total,
      'status' => $this->status,
      'payment_status' => $this->payment_status,
      'payment_method' => $this->payment_method,
      'shipping_address' => $this->shipping_address,
      'customer_email' => $this->customer_email,
      'customer_phone' => $this->customer_phone,
      'notes' => $this->notes,
      'customer' => CustomerResource::when($this->customer, $this->customer),
      'items' => OrderItemResource::collection($this->whenLoaded('items')),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}