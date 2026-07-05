<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  private CategoryService $categoryService;

  public function __construct(CategoryService $categoryService)
  {
    $this->categoryService = $categoryService;
  }

  public function index()
  {
    return CategoryResource::collection($this->categoryService->getAll());
  }

  public function store(CategoryRequest $request)
  {
    $category = $this->categoryService->create($request->validated());
    return new CategoryResource($category);
  }

  public function show(int $id)
  {
    $category = $this->categoryService->find($id);
    return new CategoryResource($category);
  }

  public function update(CategoryRequest $request, int $id)
  {
    $category = $this->categoryService->update($id, $request->validated());
    return new CategoryResource($category);
  }

  public function destroy(int $id)
  {
    $this->categoryService->delete($id);
    return response()->json(null, 204);
  }

  public function active()
  {
    return CategoryResource::collection($this->categoryService->getActiveCategories());
  }

  public function bySlug(string $slug)
  {
    $category = $this->categoryService->getBySlug($slug);
    return new CategoryResource($category);
  }
}