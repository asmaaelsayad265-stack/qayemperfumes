<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
{
  public function authorize(): bool
  {
    return $this->user()?->tokenCan('customers:manage') ?? false;
  }

  public function rules(): array
  {
    $customerId = $this->route('id');

    return [
      'name' => 'required|string|max:255',
      'email' => [
        'nullable',
        'email',
        'max:255',
        Rule::unique('customers', 'email')->ignore($customerId),
      ],
      'phone' => 'nullable|string|max:20',
      'is_vip' => 'boolean',
    ];
  }
}
