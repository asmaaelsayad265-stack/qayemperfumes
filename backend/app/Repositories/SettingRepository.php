<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
  public function __construct(Setting $model)
  {
    parent::__construct($model);
  }

  public function getByKey(string $key)
  {
    return $this->model->where('key', $key)->first();
  }

  public function getByGroup(string $group)
  {
    return $this->model->where('group', $group)->get();
  }

  public function getValue(string $key, $default = null)
  {
    $setting = $this->getByKey($key);
    return $setting ? $setting->value : $default;
  }
}