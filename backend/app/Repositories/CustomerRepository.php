<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Repositories\Contracts\CustomerRepositoryInterface;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
  public function __construct(Customer $model)
  {
    parent::__construct($model);
  }

  public function getVIPCustomers()
  {
    return $this->model->where('is_vip', true)->get();
  }

  public function getByEmail(string $email)
  {
    return $this->model->where('email', $email)->first();
  }
}