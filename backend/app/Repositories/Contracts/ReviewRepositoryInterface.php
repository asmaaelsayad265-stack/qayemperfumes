<?php

namespace App\Repositories\Contracts;

use App\Models\Review;

interface ReviewRepositoryInterface
{
  public function getApprovedReviews();
  public function getByProduct(int $productId);
  public function getPendingReviews();
}
