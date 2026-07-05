<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller
{
  private AnalyticsService $analyticsService;

  public function __construct(AnalyticsService $analyticsService)
  {
    $this->analyticsService = $analyticsService;
  }

  public function dashboard(): JsonResponse
  {
    $stats = $this->analyticsService->getDashboardStats();
    return response()->json($stats);
  }

  public function sales(): JsonResponse
  {
    $analytics = $this->analyticsService->getSalesAnalytics();
    return response()->json($analytics);
  }

  public function topProducts(): JsonResponse
  {
    $products = $this->analyticsService->getTopProducts();
    return response()->json($products);
  }
}