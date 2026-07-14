<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name_ar' => $this->name_ar,
      'name_en' => $this->name_en,
      'slug' => $this->slug,
      'description_ar' => $this->description_ar,
      'description_en' => $this->description_en,
      'price' => $this->price,
      'original_price' => $this->original_price,
      'category_id' => $this->category_id,
      'status' => $this->status,
      'season' => $this->season,
      'gender' => $this->gender,
      'is_featured' => $this->is_featured,
      'is_best_seller' => $this->is_best_seller,
      'is_limited_edition' => $this->is_limited_edition,
      'image' => $this->image,
      'category' => $this->when($this->category, fn () => CategoryResource::make($this->category)),
      'images' => ProductImageResource::collection($this->whenLoaded('images')),
      'notes' => ProductNoteResource::collection($this->whenLoaded('notes')),
      'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
      'inventory' => $this->when($this->inventory, fn () => InventoryResource::make($this->inventory)),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}