<?php

namespace App\Repositories\Contracts;

use App\Models\Inventory;

interface InventoryRepositoryInterface
{
  public function getLowStockItems();
  public function getOutOfStockItems();
  public function getBySku(string $sku);
}
