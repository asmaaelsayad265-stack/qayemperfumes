<?php

namespace App\Repositories\Contracts;

use App\Models\Order;

interface OrderRepositoryInterface
{
  public function getByStatus(string $status);
  public function getByCustomer(int $customerId);
  public function getRecentOrders(int $limit = 10);
}
