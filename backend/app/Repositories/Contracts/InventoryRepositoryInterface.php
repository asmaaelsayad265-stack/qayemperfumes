<?php

namespace App\Repositories\Contracts;

use App\Models\Inventory;
use Illuminate\Database\Eloquent\Collection;

interface InventoryRepositoryInterface
{
  public function all(array $columns = ['*']): Collection;
  public function find(int $id, array $columns = ['*']): ?Inventory;
  public function create(array $data): Inventory;
  public function update(int $id, array $data): bool;
  public function delete(int $id): bool;
  public function paginate(int $perPage = 15);
  public function getLowStockItems();
  public function getOutOfStockItems();
  public function getBySku(string $sku);
}