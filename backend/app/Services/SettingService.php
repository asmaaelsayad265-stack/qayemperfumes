<?php

namespace App\Services;

use App\Repositories\SettingRepository;

class SettingService extends BaseService
{
  private SettingRepository $settingRepository;

  public function __construct(SettingRepository $repository)
  {
    parent::__construct($repository);
    $this->settingRepository = $repository;
  }

  public function getByKey(string $key, $default = null)
  {
    return $this->settingRepository->getValue($key, $default);
  }

  public function getByGroup(string $group)
  {
    return $this->settingRepository->getByGroup($group);
  }

  public function setValue(string $key, $value)
  {
    $setting = $this->settingRepository->getByKey($key);
    if ($setting) {
      return $setting->update(['value' => $value]);
    }
    return $this->create(['key' => $key, 'value' => $value]);
  }
}