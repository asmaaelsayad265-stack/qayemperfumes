<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    $categoryId = $this->route('id');

    return [
      'name_ar' => 'required|string|max:255',
      'name_en' => 'nullable|string|max:255',
      'slug' => ['required', 'string', 'max:255', Rule::unique('categories', 'slug')->ignore($categoryId)],
      'description_ar' => 'nullable|string',
      'description_en' => 'nullable|string',
      'image' => [
        'nullable',
        'string',
        'max:255',
        'regex:/^(\/[A-Za-z0-9._~\/-]+\.(jpg|jpeg|png|webp|avif)|https:\/\/[^\s]+\.(jpg|jpeg|png|webp|avif))$/i',
      ],
      'sort_order' => 'integer|min:0',
      'is_active' => 'boolean',
    ];
  }
}
