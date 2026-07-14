<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InventoryRequest extends FormRequest
{
  public function authorize(): bool
  {
    return $this->user()?->tokenCan('inventory:manage') ?? false;
  }

  public function rules(): array
  {
    $inventoryId = $this->route('id');

    return [
      'product_id' => 'required|exists:products,id',
      'sku' => ['required', 'string', 'max:255', Rule::unique('inventory', 'sku')->ignore($inventoryId)],
      'variant' => 'nullable|string|max:255',
      'quantity' => 'required|integer|min:0',
      'reserved' => 'integer|min:0',
      'low_stock_threshold' => 'integer|min:0',
      'location' => 'nullable|string|max:255',
      'status' => 'required|in:in_stock,out_of_stock,low_stock',
    ];
  }
}
