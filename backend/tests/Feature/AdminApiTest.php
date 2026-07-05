<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
  use RefreshDatabase;

  public function test_admin_can_list_and_update_order_status(): void
  {
    $this->actingAsAdmin();
    [$customer, $product] = $this->createCatalogAndCustomer();

    $order = Order::create([
      'order_number' => 'QY-1001',
      'customer_id' => $customer->id,
      'total' => 320,
      'status' => 'new',
      'payment_status' => 'paid',
      'payment_method' => 'card',
      'shipping_address' => 'Riyadh',
      'customer_email' => $customer->email,
      'customer_phone' => $customer->phone,
    ]);

    OrderItem::create([
      'order_id' => $order->id,
      'product_id' => $product->id,
      'product_name' => $product->name_ar,
      'quantity' => 2,
      'unit_price' => 160,
      'subtotal' => 320,
    ]);

    $this->getJson('/api/v1/orders')
      ->assertOk()
      ->assertJsonPath('data.0.order_number', 'QY-1001')
      ->assertJsonPath('data.0.items.0.product_name', $product->name_ar);

    $this->putJson("/api/v1/orders/{$order->id}", [
      'order_number' => 'QY-1001',
      'customer_id' => $customer->id,
      'total' => 320,
      'status' => 'preparing',
      'payment_status' => 'paid',
      'payment_method' => 'card',
      'shipping_address' => 'Riyadh',
      'customer_email' => $customer->email,
      'customer_phone' => $customer->phone,
      'notes' => null,
    ])
      ->assertOk()
      ->assertJsonPath('data.status', 'preparing');
  }

  public function test_admin_can_filter_vip_customers_and_read_customer_orders(): void
  {
    $this->actingAsAdmin();
    [$customer] = $this->createCatalogAndCustomer(isVip: true);

    Order::create([
      'order_number' => 'QY-2001',
      'customer_id' => $customer->id,
      'total' => 180,
      'status' => 'completed',
      'payment_status' => 'paid',
    ]);

    $this->getJson('/api/v1/customers/vip')
      ->assertOk()
      ->assertJsonPath('data.0.email', $customer->email)
      ->assertJsonPath('data.0.is_vip', true);

    $this->getJson("/api/v1/orders/customer/{$customer->id}")
      ->assertOk()
      ->assertJsonPath('data.0.order_number', 'QY-2001');
  }

  public function test_analytics_and_low_stock_endpoints_return_real_operational_data(): void
  {
    $this->actingAsAdmin();
    [$customer, $product] = $this->createCatalogAndCustomer();

    $order = Order::create([
      'order_number' => 'QY-3001',
      'customer_id' => $customer->id,
      'total' => 240,
      'status' => 'completed',
      'payment_status' => 'paid',
    ]);

    OrderItem::create([
      'order_id' => $order->id,
      'product_id' => $product->id,
      'product_name' => $product->name_ar,
      'quantity' => 3,
      'unit_price' => 80,
      'subtotal' => 240,
    ]);

    Inventory::create([
      'product_id' => $product->id,
      'sku' => 'QY-LOW-001',
      'variant' => '100ml',
      'quantity' => 2,
      'reserved' => 0,
      'low_stock_threshold' => 5,
      'status' => 'low_stock',
    ]);

    $this->getJson('/api/v1/analytics/sales')
      ->assertOk()
      ->assertJsonPath('total_sales', 240)
      ->assertJsonCount(6, 'monthly_sales')
      ->assertJsonPath('sales_by_category.0.items_sold', 3);

    $this->getJson('/api/v1/analytics/top-products')
      ->assertOk()
      ->assertJsonPath('0.product_name', $product->name_ar)
      ->assertJsonPath('0.sales', 3);

    $this->getJson('/api/v1/inventory/low-stock')
      ->assertOk()
      ->assertJsonPath('data.0.sku', 'QY-LOW-001');
  }

  public function test_validation_protects_unique_slugs_skus_and_order_statuses(): void
  {
    $this->actingAsAdmin();
    [$customer, $product, $category] = $this->createCatalogAndCustomer();

    Product::create([
      'name_ar' => 'عطر ثان',
      'name_en' => 'Second Perfume',
      'slug' => 'second-perfume',
      'price' => 150,
      'category_id' => $category->id,
      'status' => 'active',
      'season' => 'all',
      'gender' => 'unisex',
    ]);

    Inventory::create([
      'product_id' => $product->id,
      'sku' => 'QY-UNIQUE-001',
      'variant' => '100ml',
      'quantity' => 10,
      'reserved' => 0,
      'low_stock_threshold' => 3,
      'status' => 'in_stock',
    ]);

    $this->postJson('/api/v1/products', [
      'name_ar' => 'تكرار',
      'slug' => 'second-perfume',
      'price' => 99,
      'category_id' => $category->id,
      'status' => 'active',
      'season' => 'all',
      'gender' => 'unisex',
      'is_featured' => false,
      'is_best_seller' => false,
      'is_limited_edition' => false,
    ])->assertStatus(422);

    $this->postJson('/api/v1/inventory', [
      'product_id' => $product->id,
      'sku' => 'QY-UNIQUE-001',
      'variant' => '50ml',
      'quantity' => 5,
      'reserved' => 0,
      'low_stock_threshold' => 3,
      'status' => 'in_stock',
    ])->assertStatus(422);

    $this->postJson('/api/v1/orders', [
      'order_number' => 'QY-INVALID',
      'customer_id' => $customer->id,
      'total' => 100,
      'status' => 'refunded',
      'payment_status' => 'paid',
    ])->assertStatus(422);
  }

  private function actingAsAdmin(): User
  {
    $user = User::create([
      'name' => 'Admin',
      'email' => 'admin@qayem.test',
      'password' => 'password',
      'role' => 'admin',
      'is_active' => true,
    ]);

    Sanctum::actingAs($user, ['*']);

    return $user;
  }

  private function createCatalogAndCustomer(bool $isVip = false): array
  {
    $category = Category::create([
      'name_ar' => 'عود',
      'name_en' => 'Oud',
      'slug' => 'oud',
      'is_active' => true,
    ]);

    $product = Product::create([
      'name_ar' => 'عود قيم',
      'name_en' => 'Qayem Oud',
      'slug' => 'qayem-oud',
      'price' => 160,
      'category_id' => $category->id,
      'status' => 'active',
      'season' => 'all',
      'gender' => 'unisex',
      'is_featured' => true,
      'is_best_seller' => true,
      'is_limited_edition' => false,
    ]);

    $customer = Customer::create([
      'name' => 'Noura',
      'email' => 'noura@example.test',
      'phone' => '+966500000000',
      'orders_count' => 1,
      'total_spent' => 320,
      'is_vip' => $isVip,
      'last_order_at' => now(),
    ]);

    return [$customer, $product, $category];
  }
}
