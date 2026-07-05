<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
  public function __construct(Product $model)
  {
    parent::__construct($model);
  }

  public function getActiveProducts()
  {
    return $this->model->where('status', 'active')->get();
  }

  public function getFeaturedProducts()
  {
    return $this->model->where('is_featured', true)
      ->where('status', 'active')
      ->get();
  }

  public function getBestSellers()
  {
    return $this->model->where('is_best_seller', true)
      ->where('status', 'active')
      ->get();
  }

  public function getByCategory(int $categoryId)
  {
    return $this->model->where('category_id', $categoryId)
      ->where('status', 'active')
      ->get();
  }

  public function getBySlug(string $slug)
  {
    return $this->model->where('slug', $slug)->first();
  }

  public function search(string $query)
  {
    return $this->model->where('name_ar', 'like', "%{$query}%")
      ->orWhere('name_en', 'like', "%{$query}%")
      ->get();
  }
}