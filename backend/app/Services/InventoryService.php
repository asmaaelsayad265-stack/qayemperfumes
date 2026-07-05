<?php

namespace App\Services;

use App\Repositories\InventoryRepository;

class InventoryService extends BaseService
{
  public function __construct(InventoryRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getLowStockItems()
  {
    return $this->repository->getLowStockItems();
  }

  public function getOutOfStockItems()
  {
    return $this->repository->getOutOfStockItems();
  }

  public function getBySku(string $sku)
  {
    return $this->repository->getBySku($sku);
  }
}