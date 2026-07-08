<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
  public function authorize(): bool
  {
    return $this->user()?->tokenCan('reviews:manage') ?? false;
  }

  public function rules(): array
  {
    return [
      'product_id' => 'required|exists:products,id',
      'customer_id' => 'nullable|exists:customers,id',
      'customer_name' => 'required|string|max:255',
      'customer_email' => 'nullable|email|max:255',
      'rating' => 'required|integer|min:1|max:5',
      'body' => 'nullable|string',
      'is_approved' => 'boolean',
    ];
  }
}