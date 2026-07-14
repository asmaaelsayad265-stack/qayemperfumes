<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SettingRequest extends FormRequest
{
  public function authorize(): bool
  {
    return $this->user()?->tokenCan('settings:manage') ?? false;
  }

  public function rules(): array
  {
    $settingId = $this->route('id');

    return [
      'key' => ['required', 'string', 'max:255', Rule::unique('settings', 'key')->ignore($settingId)],
      'value' => 'nullable|string',
      'group' => 'nullable|string|max:255',
    ];
  }
}
