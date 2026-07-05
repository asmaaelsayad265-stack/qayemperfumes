<?php

namespace App\Services;

use App\Repositories\CustomerRepository;

class CustomerService extends BaseService
{
  public function __construct(CustomerRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getVIPCustomers()
  {
    return $this->repository->getVIPCustomers();
  }

  public function getByEmail(string $email)
  {
    return $this->repository->getByEmail($email);
  }
}