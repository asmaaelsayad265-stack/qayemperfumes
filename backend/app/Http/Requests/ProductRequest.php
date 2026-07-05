<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    $productId = $this->route('id');

    return [
      'name_ar' => 'required|string|max:255',
      'name_en' => 'nullable|string|max:255',
      'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
      'description_ar' => 'nullable|string',
      'description_en' => 'nullable|string',
      'price' => 'required|numeric|min:0',
      'original_price' => 'nullable|numeric|min:0',
      'category_id' => 'required|exists:categories,id',
      'status' => 'required|in:active,draft,archived',
      'season' => 'required|in:all,summer,winter,spring,autumn',
      'gender' => 'required|in:unisex,men,women',
      'is_featured' => 'boolean',
      'is_best_seller' => 'boolean',
      'is_limited_edition' => 'boolean',
      'image' => 'nullable|string|max:255',
    ];
  }
}
