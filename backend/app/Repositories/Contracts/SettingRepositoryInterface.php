<?php

namespace App\Repositories\Contracts;

use App\Models\Setting;

interface SettingRepositoryInterface
{
  public function getByKey(string $key);
  public function getByGroup(string $group);
  public function getValue(string $key, $default = null);
}
