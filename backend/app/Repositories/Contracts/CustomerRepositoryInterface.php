<?php

namespace App\Repositories\Contracts;

use App\Models\Customer;

interface CustomerRepositoryInterface
{
  public function getVIPCustomers();
  public function getByEmail(string $email);
}
