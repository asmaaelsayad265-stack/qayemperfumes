<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfferRequest extends FormRequest
{
  public function authorize(): bool
  {
    return $this->user()?->tokenCan('products:manage') ?? false;
  }

  public function rules(): array
  {
    return [
      'product_id' => ['required', 'exists:products,id'],
      'discount_type' => ['required', 'in:percentage,fixed'],
      'discount_value' => ['required', 'numeric', 'min:0'],
      'starts_at' => ['nullable', 'date'],
      'expires_at' => ['nullable', 'date', 'after:starts_at'],
      'is_active' => ['boolean'],
    ];
  }
}
