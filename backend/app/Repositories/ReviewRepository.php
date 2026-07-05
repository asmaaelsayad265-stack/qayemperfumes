<?php

namespace App\Repositories;

use App\Models\Review;
use App\Repositories\Contracts\ReviewRepositoryInterface;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
{
  public function __construct(Review $model)
  {
    parent::__construct($model);
  }

  public function getApprovedReviews()
  {
    return $this->model->where('is_approved', true)->get();
  }

  public function getByProduct(int $productId)
  {
    return $this->model->where('product_id', $productId)
      ->where('is_approved', true)
      ->get();
  }

  public function getPendingReviews()
  {
    return $this->model->where('is_approved', false)->get();
  }
}