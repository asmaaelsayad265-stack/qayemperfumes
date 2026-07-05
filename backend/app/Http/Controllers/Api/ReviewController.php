<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Http\Requests\ReviewRequest;
use App\Services\ReviewService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
  private ReviewService $reviewService;

  public function __construct(ReviewService $reviewService)
  {
    $this->reviewService = $reviewService;
  }

  public function index()
  {
    return ReviewResource::collection($this->reviewService->getAll());
  }

  public function store(ReviewRequest $request)
  {
    $review = $this->reviewService->create($request->validated());
    return new ReviewResource($review);
  }

  public function show(int $id)
  {
    $review = $this->reviewService->find($id);
    return new ReviewResource($review);
  }

  public function update(ReviewRequest $request, int $id)
  {
    $review = $this->reviewService->update($id, $request->validated());
    return new ReviewResource($review);
  }

  public function destroy(int $id)
  {
    $this->reviewService->delete($id);
    return response()->json(null, 204);
  }

  public function approved()
  {
    return ReviewResource::collection($this->reviewService->getApprovedReviews());
  }

  public function byProduct(int $productId)
  {
    return ReviewResource::collection($this->reviewService->getByProduct($productId));
  }

  public function pending()
  {
    return ReviewResource::collection($this->reviewService->getPendingReviews());
  }
}