<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    $orderId = $this->route('id');

    return [
      'order_number' => [
        'required',
        'string',
        'max:255',
        Rule::unique('orders', 'order_number')->ignore($orderId),
      ],
      'customer_id' => 'required|exists:customers,id',
      'total' => 'required|numeric|min:0',
      'status' => 'required|in:new,preparing,shipped,completed,canceled',
      'payment_status' => 'required|in:paid,pending,failed',
      'payment_method' => 'nullable|string|max:255',
      'shipping_address' => 'nullable|string|max:500',
      'customer_email' => 'nullable|email|max:255',
      'customer_phone' => 'nullable|string|max:20',
      'notes' => 'nullable|string',
    ];
  }
}
