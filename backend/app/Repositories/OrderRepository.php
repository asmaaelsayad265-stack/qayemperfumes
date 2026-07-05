<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Contracts\OrderRepositoryInterface;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
  public function __construct(Order $model)
  {
    parent::__construct($model);
  }

  public function getByStatus(string $status)
  {
    return $this->model->where('status', $status)->get();
  }

  public function getByCustomer(int $customerId)
  {
    return $this->model->where('customer_id', $customerId)->get();
  }

  public function getRecentOrders(int $limit = 10)
  {
    return $this->model->latest()->take($limit)->get();
  }
}