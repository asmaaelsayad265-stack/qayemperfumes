<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name_ar' => 'required|string|max:255',
      'name_en' => 'nullable|string|max:255',
      'slug' => 'required|string|max:255|unique:categories,slug',
      'description_ar' => 'nullable|string',
      'description_en' => 'nullable|string',
      'image' => 'nullable|string|max:255',
      'sort_order' => 'integer|min:0',
      'is_active' => 'boolean',
    ];
  }
}