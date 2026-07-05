<?php

namespace App\Repositories\Contracts;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Collection;

interface CustomerRepositoryInterface
{
  public function all(array $columns = ['*']): Collection;
  public function find(int $id, array $columns = ['*']): ?Customer;
  public function create(array $data): Customer;
  public function update(int $id, array $data): bool;
  public function delete(int $id): bool;
  public function paginate(int $perPage = 15);
  public function getVIPCustomers();
  public function getByEmail(string $email);
}