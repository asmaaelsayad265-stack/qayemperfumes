<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
  public function __construct(Category $model)
  {
    parent::__construct($model);
  }

  public function getActiveCategories()
  {
    return $this->model->where('is_active', true)
      ->orderBy('sort_order')
      ->get();
  }

  public function getBySlug(string $slug)
  {
    return $this->model->where('slug', $slug)->first();
  }
}