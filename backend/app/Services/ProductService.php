<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService extends BaseService
{
  public function __construct(ProductRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getActiveProducts()
  {
    return $this->repository->getActiveProducts();
  }

  public function getFeaturedProducts()
  {
    return $this->repository->getFeaturedProducts();
  }

  public function getBestSellers()
  {
    return $this->repository->getBestSellers();
  }

  public function getByCategory(int $categoryId)
  {
    return $this->repository->getByCategory($categoryId);
  }

  public function getBySlug(string $slug)
  {
    return $this->repository->getBySlug($slug);
  }

  public function search(string $query)
  {
    return $this->repository->search($query);
  }
}