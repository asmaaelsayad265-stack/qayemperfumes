<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\InventoryRepository;

class AnalyticsService
{
  private OrderRepository $orderRepository;
  private ProductRepository $productRepository;
  private CustomerRepository $customerRepository;
  private InventoryRepository $inventoryRepository;

  public function __construct(
    OrderRepository $orderRepository,
    ProductRepository $productRepository,
    CustomerRepository $customerRepository,
    InventoryRepository $inventoryRepository
  ) {
    $this->orderRepository = $orderRepository;
    $this->productRepository = $productRepository;
    $this->customerRepository = $customerRepository;
    $this->inventoryRepository = $inventoryRepository;
  }

  public function getDashboardStats()
  {
    return [
      'total_orders' => $this->orderRepository->all()->count(),
      'total_products' => $this->productRepository->all()->count(),
      'total_customers' => $this->customerRepository->all()->count(),
      'low_stock_items' => $this->inventoryRepository->getLowStockItems()->count(),
      'recent_orders' => $this->orderRepository->getRecentOrders(5),
    ];
  }

  public function getSalesAnalytics()
  {
    $orders = $this->orderRepository->all();
    return [
      'total_sales' => $orders->sum('total'),
      'orders_by_status' => $orders->groupBy('status')->map->count(),
      'recent_sales' => $orders->where('created_at', '>=', now()->subDays(30))->sum('total'),
    ];
  }

  public function getTopProducts(int $limit = 10)
  {
    return $this->productRepository->getBestSellers()->take($limit);
  }
}