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
    return $this->model->where('status', 'active')->with('category')->get();
  }

  public function getFeaturedProducts()
  {
    return $this->model->where('is_featured', true)->where('status', 'active')->with('category')->get();
  }

  public function getBestSellers()
  {
    return $this->model->where('is_best_seller', true)->where('status', 'active')->with('category')->get();
  }

  public function getByCategory(int $categoryId)
  {
    return $this->model->where('category_id', $categoryId)->where('status', 'active')->with('category')->get();
  }

  public function getBySlug(string $slug)
  {
    return $this->model->where('slug', $slug)->first();
  }

  public function search(string $query)
  {
    // First escape the backslash itself, then escape the SQL wildcards
    $escapedQuery = str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $query);

    return $this->model
      ->where(function ($q) use ($escapedQuery) {
        $q->where('name_ar', 'like', "%{$escapedQuery}%")
          ->orWhere('name_en', 'like', "%{$escapedQuery}%");
      })
      ->where('status', 'active')
      ->with('category')
      ->paginate(20);
  }
}