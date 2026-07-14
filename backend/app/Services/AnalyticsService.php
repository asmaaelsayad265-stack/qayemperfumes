<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\InventoryRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Order;

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
      'total_orders' => $this->orderRepository->count(),
      'total_products' => $this->productRepository->count(),
      'total_customers' => $this->customerRepository->count(),
      'low_stock_items' => $this->inventoryRepository->countLowStock(),
      'recent_orders' => $this->orderRepository->getRecentOrders(5),
    ];
  }

  public function getSalesAnalytics()
  {
    $ordersByStatus = Order::select('status', DB::raw('COUNT(*) as orders_count'))
      ->groupBy('status')
      ->get()
      ->pluck('orders_count', 'status');

    $recentSales = Order::where('created_at', '>=', now()->subDays(30))
      ->sum('total');

    return [
      'total_sales' => Order::sum('total'),
      'orders_by_status' => $ordersByStatus->all(),
      'recent_sales' => $recentSales,
      'monthly_sales' => $this->getMonthlySales(),
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

  private function getMonthlySales()
  {
    $sixMonthsAgo = now()->subMonths(5)->startOfMonth();

    $monthlyData = Order::select(
      DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
      DB::raw('SUM(total) as revenue'),
      DB::raw('COUNT(*) as orders')
    )
      ->where('created_at', '>=', $sixMonthsAgo)
      ->groupBy('month')
      ->orderBy('month')
      ->get()
      ->keyBy('month');

    return collect(range(5, 0))->map(function (int $monthsAgo) {
      $month = now()->subMonths($monthsAgo)->format('Y-m');
      $data = $monthlyData->get($month);

      return [
        'month' => $month,
        'revenue' => $data->revenue ?? 0,
        'orders' => $data->orders ?? 0,
      ];
    })->values();
  }

  private function getSalesByCategory()
  {
    return OrderItem::query()
      ->select(
        DB::raw('COALESCE(categories.name_ar, "غير مصنف") as category'),
        DB::raw('SUM(order_items.subtotal) as revenue'),
        DB::raw('SUM(order_items.quantity) as items_sold')
      )
      ->leftJoin('products', 'order_items.product_id', '=', 'products.id')
      ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
      ->groupBy('category')
      ->orderByDesc('revenue')
      ->get()
      ->map(fn ($item) => [
        'category' => $item->category,
        'revenue' => $item->revenue,
        'items_sold' => $item->items_sold,
      ])
      ->values();
  }
}
