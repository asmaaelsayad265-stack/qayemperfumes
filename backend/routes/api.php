<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\OfferController;

// Auth routes (public)
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1')->name('api.auth.login');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('api.auth.logout');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum')->name('api.auth.user');
Route::post('/auth/refresh', [AuthController::class, 'refresh'])->middleware('auth:sanctum')->name('api.auth.refresh');
Route::post('/auth/change-password', [AuthController::class, 'changePassword'])->middleware('auth:sanctum')->name('api.auth.change-password');

Route::prefix('v1')->group(function () {
  // Public routes
  Route::get('/products', [ProductController::class, 'index'])->middleware('throttle:60,1')->name('api.products.index');
  Route::get('/products/featured', [ProductController::class, 'featured'])->middleware('throttle:60,1')->name('api.products.featured');
  Route::get('/products/best-sellers', [ProductController::class, 'bestSellers'])->middleware('throttle:60,1')->name('api.products.best-sellers');
  Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory'])->middleware('throttle:60,1')->name('api.products.by-category');
  Route::get('/products/slug/{slug}', [ProductController::class, 'bySlug'])->middleware('throttle:60,1')->name('api.products.by-slug');
  Route::get('/products/search', [ProductController::class, 'search'])->middleware('throttle:60,1')->name('api.products.search');
  Route::get('/products/{id}', [ProductController::class, 'show'])->middleware('throttle:60,1')->name('api.products.show');

  Route::get('/categories', [CategoryController::class, 'index'])->middleware('throttle:60,1')->name('api.categories.index');
  Route::get('/categories/active', [CategoryController::class, 'active'])->middleware('throttle:60,1')->name('api.categories.active');
  Route::get('/categories/slug/{slug}', [CategoryController::class, 'bySlug'])->middleware('throttle:60,1')->name('api.categories.by-slug');
  Route::get('/categories/{id}', [CategoryController::class, 'show'])->middleware('throttle:60,1')->name('api.categories.show');

  Route::get('/reviews/approved', [ReviewController::class, 'approved'])->middleware('throttle:60,1')->name('api.reviews.approved');
  Route::get('/reviews/product/{productId}', [ReviewController::class, 'byProduct'])->middleware('throttle:60,1')->name('api.reviews.by-product');
  Route::get('/reviews/{id}', [ReviewController::class, 'show'])->middleware('throttle:60,1')->name('api.reviews.show');

  Route::get('/offers', [OfferController::class, 'index'])->middleware('throttle:60,1')->name('api.offers.index');
  Route::get('/offers/active', [OfferController::class, 'active'])->middleware('throttle:60,1')->name('api.offers.active');
  Route::get('/offers/{id}', [OfferController::class, 'show'])->middleware('throttle:60,1')->name('api.offers.show');
  Route::middleware('auth:sanctum')->group(function () {
    // Products
    Route::post('/products', [ProductController::class, 'store'])->middleware('throttle:write')->name('api.products.store');
    Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('throttle:write')->name('api.products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('throttle:write')->name('api.products.destroy');

    // Categories
    Route::post('/categories', [CategoryController::class, 'store'])->middleware('throttle:write')->name('api.categories.store');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->middleware('throttle:write')->name('api.categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->middleware('throttle:write')->name('api.categories.destroy');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->middleware('throttle:api')->name('api.orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->middleware('throttle:write')->name('api.orders.store');
    Route::get('/orders/status/{status}', [OrderController::class, 'byStatus'])->middleware('throttle:api')->name('api.orders.by-status');
    Route::get('/orders/customer/{customerId}', [OrderController::class, 'byCustomer'])->middleware('throttle:api')->name('api.orders.by-customer');
    Route::get('/orders/recent', [OrderController::class, 'recent'])->middleware('throttle:api')->name('api.orders.recent');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->middleware('throttle:api')->name('api.orders.show');
    Route::put('/orders/{id}', [OrderController::class, 'update'])->middleware('throttle:write')->name('api.orders.update');
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->middleware('throttle:write')->name('api.orders.destroy');

    // Customers
    Route::get('/customers', [CustomerController::class, 'index'])->middleware('throttle:api')->name('api.customers.index');
    Route::post('/customers', [CustomerController::class, 'store'])->middleware('throttle:write')->name('api.customers.store');
    Route::get('/customers/vip', [CustomerController::class, 'vip'])->middleware('throttle:api')->name('api.customers.vip');
    Route::get('/customers/email/{email}', [CustomerController::class, 'byEmail'])->middleware('throttle:api')->name('api.customers.by-email');
    Route::get('/customers/{id}', [CustomerController::class, 'show'])->middleware('throttle:api')->name('api.customers.show');
    Route::put('/customers/{id}', [CustomerController::class, 'update'])->middleware('throttle:write')->name('api.customers.update');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->middleware('throttle:write')->name('api.customers.destroy');

    // Inventory
    Route::get('/inventory', [InventoryController::class, 'index'])->middleware('throttle:api')->name('api.inventory.index');
    Route::post('/inventory', [InventoryController::class, 'store'])->middleware('throttle:write')->name('api.inventory.store');
    Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock'])->middleware('throttle:api')->name('api.inventory.low-stock');
    Route::get('/inventory/out-of-stock', [InventoryController::class, 'outOfStock'])->middleware('throttle:api')->name('api.inventory.out-of-stock');
    Route::get('/inventory/sku/{sku}', [InventoryController::class, 'bySku'])->middleware('throttle:api')->name('api.inventory.by-sku');
    Route::get('/inventory/{id}', [InventoryController::class, 'show'])->middleware('throttle:api')->name('api.inventory.show');
    Route::put('/inventory/{id}', [InventoryController::class, 'update'])->middleware('throttle:write')->name('api.inventory.update');
    Route::delete('/inventory/{id}', [InventoryController::class, 'destroy'])->middleware('throttle:write')->name('api.inventory.destroy');

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store'])->middleware('throttle:write')->name('api.reviews.store');
    Route::put('/reviews/{id}', [ReviewController::class, 'update'])->middleware('throttle:write')->name('api.reviews.update');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->middleware('throttle:write')->name('api.reviews.destroy');
    Route::get('/reviews/pending', [ReviewController::class, 'pending'])->middleware('throttle:api')->name('api.reviews.pending');

    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->middleware('throttle:api')->name('api.settings.index');
    Route::post('/settings', [SettingController::class, 'store'])->middleware('throttle:write')->name('api.settings.store');
    Route::get('/settings/{id}', [SettingController::class, 'show'])->middleware('throttle:api')->name('api.settings.show');
    Route::put('/settings/{id}', [SettingController::class, 'update'])->middleware('throttle:write')->name('api.settings.update');
    Route::delete('/settings/{id}', [SettingController::class, 'destroy'])->middleware('throttle:write')->name('api.settings.destroy');
    Route::get('/settings/key/{key}', [SettingController::class, 'byKey'])->middleware('throttle:api')->name('api.settings.by-key');
    Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api')->name('api.settings.by-group');

    // Analytics
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard'])->middleware('throttle:api')->name('api.analytics.dashboard');
    Route::get('/analytics/sales', [AnalyticsController::class, 'sales'])->middleware('throttle:api')->name('api.analytics.sales');
    Route::get('/analytics/top-products', [AnalyticsController::class, 'topProducts'])->middleware('throttle:api')->name('api.analytics.top-products');
  });
});