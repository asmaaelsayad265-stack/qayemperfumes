<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductNoteResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'product_id' => $this->product_id,
      'note_type' => $this->note_type,
      'name_ar' => $this->name_ar,
      'name_en' => $this->name_en,
      'sort_order' => $this->sort_order,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}