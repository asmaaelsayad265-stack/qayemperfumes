<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Contracts\OrderRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
  public function __construct(Order $model)
  {
    parent::__construct($model);
  }

  public function all(array $columns = ['*']): Collection
  {
    return $this->model->with(['customer', 'items'])->latest()->get($columns);
  }

  public function find(int $id, array $columns = ['*']): ?Model
  {
    return $this->model->with(['customer', 'items'])->find($id, $columns);
  }

  public function update(int $id, array $data): ?Model
  {
    $record = $this->model->find($id);

    if (! $record) {
      return null;
    }

    $record->update($data);

    return $record->fresh(['customer', 'items']);
  }

  public function getByStatus(string $status)
  {
    return $this->model->with(['customer', 'items'])->where('status', $status)->latest()->get();
  }

  public function getByCustomer(int $customerId)
  {
    return $this->model->with(['customer', 'items'])->where('customer_id', $customerId)->latest()->get();
  }

  public function getRecentOrders(int $limit = 10)
  {
    return $this->model->with(['customer', 'items'])->latest()->take($limit)->get();
  }
}
