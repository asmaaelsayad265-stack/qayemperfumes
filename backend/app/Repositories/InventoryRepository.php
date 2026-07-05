<?php

namespace App\Repositories;

use App\Models\Inventory;
use App\Repositories\Contracts\InventoryRepositoryInterface;

class InventoryRepository extends BaseRepository implements InventoryRepositoryInterface
{
  public function __construct(Inventory $model)
  {
    parent::__construct($model);
  }

  public function getLowStockItems()
  {
    return $this->model->where('quantity', '<=', 'low_stock_threshold')->get();
  }

  public function getOutOfStockItems()
  {
    return $this->model->where('status', 'out_of_stock')->get();
  }

  public function getBySku(string $sku)
  {
    return $this->model->where('sku', $sku)->first();
  }
}