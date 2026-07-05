<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'product_id' => $this->product_id,
      'customer_id' => $this->customer_id,
      'customer_name' => $this->customer_name,
      'customer_email' => $this->customer_email,
      'rating' => $this->rating,
      'body' => $this->body,
      'is_approved' => $this->is_approved,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}