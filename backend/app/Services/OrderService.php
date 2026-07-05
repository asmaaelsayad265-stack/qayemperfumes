<?php

namespace App\Services;

use App\Repositories\OrderRepository;

class OrderService extends BaseService
{
  public function __construct(OrderRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getByStatus(string $status)
  {
    return $this->repository->getByStatus($status);
  }

  public function getByCustomer(int $customerId)
  {
    return $this->repository->getByCustomer($customerId);
  }

  public function getRecentOrders(int $limit = 10)
  {
    return $this->repository->getRecentOrders($limit);
  }
}