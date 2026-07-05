<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\InventoryRepository;
use Illuminate\Support\Facades\DB;

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
      'orders_by_status' => $orders->groupBy('status')->map->count()->all(),
      'recent_sales' => $orders->where('created_at', '>=', now()->subDays(30))->sum('total'),
      'monthly_sales' => $this->getMonthlySales($orders),
      'sales_by_category' => $this->getSalesByCategory(),
    ];
  }

  public function getTopProducts(int $limit = 10)
  {
    return OrderItem::query()
      ->select(
        'product_id',
        'product_name',
        DB::raw('SUM(quantity) as sales'),
        DB::raw('SUM(subtotal) as revenue')
      )
      ->groupBy('product_id', 'product_name')
      ->orderByDesc('sales')
      ->take($limit)
      ->get();
  }

  private function getMonthlySales($orders)
  {
    return collect(range(5, 0))->map(function (int $monthsAgo) use ($orders) {
      $month = now()->subMonths($monthsAgo);
      $monthKey = $month->format('Y-m');
      $monthlyOrders = $orders->filter(fn ($order) => $order->created_at?->format('Y-m') === $monthKey);

      return [
        'month' => $monthKey,
        'revenue' => $monthlyOrders->sum('total'),
        'orders' => $monthlyOrders->count(),
      ];
    })->values();
  }

  private function getSalesByCategory()
  {
    return OrderItem::query()
      ->with('product.category')
      ->get()
      ->groupBy(fn (OrderItem $item) => $item->product?->category?->name_ar ?? 'غير مصنف')
      ->map(fn ($items, string $category) => [
        'category' => $category,
        'revenue' => $items->sum('subtotal'),
        'items_sold' => $items->sum('quantity'),
      ])
      ->sortByDesc('revenue')
      ->values();
  }
}
