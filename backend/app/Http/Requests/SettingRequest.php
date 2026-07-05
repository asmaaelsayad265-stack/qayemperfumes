<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'key' => 'required|string|max:255|unique:settings,key',
      'value' => 'nullable|string',
      'group' => 'nullable|string|max:255',
    ];
  }
}