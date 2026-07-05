<?php

namespace App\Services;

use App\Repositories\ReviewRepository;

class ReviewService extends BaseService
{
  public function __construct(ReviewRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getApprovedReviews()
  {
    return $this->repository->getApprovedReviews();
  }

  public function getByProduct(int $productId)
  {
    return $this->repository->getByProduct($productId);
  }

  public function getPendingReviews()
  {
    return $this->repository->getPendingReviews();
  }
}