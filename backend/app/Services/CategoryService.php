<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService extends BaseService
{
  public function __construct(CategoryRepository $repository)
  {
    parent::__construct($repository);
  }

  public function getActiveCategories()
  {
    return $this->repository->getActiveCategories();
  }

  public function getBySlug(string $slug)
  {
    return $this->repository->getBySlug($slug);
  }
}