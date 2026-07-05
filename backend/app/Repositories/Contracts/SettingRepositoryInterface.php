<?php

namespace App\Repositories\Contracts;

use App\Models\Setting;
use Illuminate\Database\Eloquent\Collection;

interface SettingRepositoryInterface
{
  public function all(array $columns = ['*']): Collection;
  public function find(int $id, array $columns = ['*']): ?Setting;
  public function create(array $data): Setting;
  public function update(int $id, array $data): bool;
  public function delete(int $id): bool;
  public function paginate(int $perPage = 15);
  public function getByKey(string $key);
  public function getByGroup(string $group);
  public function getValue(string $key, $default = null);
}