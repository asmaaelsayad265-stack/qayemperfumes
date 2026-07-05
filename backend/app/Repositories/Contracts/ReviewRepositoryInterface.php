<?php

namespace App\Repositories\Contracts;

use App\Models\Review;
use Illuminate\Database\Eloquent\Collection;

interface ReviewRepositoryInterface
{
  public function all(array $columns = ['*']): Collection;
  public function find(int $id, array $columns = ['*']): ?Review;
  public function create(array $data): Review;
  public function update(int $id, array $data): bool;
  public function delete(int $id): bool;
  public function paginate(int $perPage = 15);
  public function getApprovedReviews();
  public function getByProduct(int $productId);
  public function getPendingReviews();
}