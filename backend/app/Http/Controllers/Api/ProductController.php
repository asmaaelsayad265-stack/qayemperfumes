<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  private ProductService $productService;

  public function __construct(ProductService $productService)
  {
    $this->productService = $productService;
  }

  public function index()
  {
    return ProductResource::collection($this->productService->getAll());
  }

  public function store(ProductRequest $request)
  {
    $product = $this->productService->create($request->validated());
    return new ProductResource($product);
  }

  public function show(int $id)
  {
    $product = $this->productService->find($id);
    return new ProductResource($product);
  }

  public function update(ProductRequest $request, int $id)
  {
    $product = $this->productService->update($id, $request->validated());
    return new ProductResource($product);
  }

  public function destroy(int $id)
  {
    $this->productService->delete($id);
    return response()->json(null, 204);
  }

  public function featured()
  {
    return ProductResource::collection($this->productService->getFeaturedProducts());
  }

  public function bestSellers()
  {
    return ProductResource::collection($this->productService->getBestSellers());
  }

  public function byCategory(int $categoryId)
  {
    return ProductResource::collection($this->productService->getByCategory($categoryId));
  }

  public function bySlug(string $slug)
  {
    $product = $this->productService->getBySlug($slug);
    return new ProductResource($product);
  }

  public function search(Request $request)
  {
    $query = $request->get('q');
    return ProductResource::collection($this->productService->search($query));
  }
}