<?php

namespace App\Repositories\Contracts;

use App\Models\Product;

interface ProductRepositoryInterface
{
  public function getActiveProducts();
  public function getFeaturedProducts();
  public function getBestSellers();
  public function getByCategory(int $categoryId);
  public function getBySlug(string $slug);
  public function search(string $query);
}
