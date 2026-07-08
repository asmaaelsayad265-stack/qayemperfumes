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

// Auth routes (public)
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post('/auth/refresh', [AuthController::class, 'refresh'])->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
  // Public routes
  Route::get('/products', [ProductController::class, 'index']);
  Route::get('/products/featured', [ProductController::class, 'featured']);
  Route::get('/products/best-sellers', [ProductController::class, 'bestSellers']);
  Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
  Route::get('/products/slug/{slug}', [ProductController::class, 'bySlug']);
  Route::get('/products/search', [ProductController::class, 'search'])->middleware('throttle:60,1');
  Route::get('/products/{id}', [ProductController::class, 'show']);

  Route::get('/categories', [CategoryController::class, 'index']);
  Route::get('/categories/active', [CategoryController::class, 'active']);
  Route::get('/categories/slug/{slug}', [CategoryController::class, 'bySlug']);
  Route::get('/categories/{id}', [CategoryController::class, 'show']);

  Route::get('/reviews/approved', [ReviewController::class, 'approved']);
  Route::get('/reviews/product/{productId}', [ReviewController::class, 'byProduct']);
  Route::get('/reviews/{id}', [ReviewController::class, 'show']);

  // Protected routes (require authentication)
  Route::middleware('auth:sanctum')->group(function () {
    // Products
    Route::post('/products', [ProductController::class, 'store'])->middleware('throttle:write');
    Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('throttle:write');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('throttle:write');

    // Categories
    Route::post('/categories', [CategoryController::class, 'store'])->middleware('throttle:write');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->middleware('throttle:write');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->middleware('throttle:write');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->middleware('throttle:api');
    Route::post('/orders', [OrderController::class, 'store'])->middleware('throttle:write');
    Route::get('/orders/status/{status}', [OrderController::class, 'byStatus'])->middleware('throttle:api');
    Route::get('/orders/customer/{customerId}', [OrderController::class, 'byCustomer'])->middleware('throttle:api');
    Route::get('/orders/recent', [OrderController::class, 'recent'])->middleware('throttle:api');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->middleware('throttle:api');
    Route::put('/orders/{id}', [OrderController::class, 'update'])->middleware('throttle:write');
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->middleware('throttle:write');

    // Customers
    Route::get('/customers', [CustomerController::class, 'index'])->middleware('throttle:api');
    Route::post('/customers', [CustomerController::class, 'store'])->middleware('throttle:write');
    Route::get('/customers/vip', [CustomerController::class, 'vip'])->middleware('throttle:api');
    Route::get('/customers/email/{email}', [CustomerController::class, 'byEmail'])->middleware('throttle:api');
    Route::get('/customers/{id}', [CustomerController::class, 'show'])->middleware('throttle:api');
    Route::put('/customers/{id}', [CustomerController::class, 'update'])->middleware('throttle:write');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->middleware('throttle:write');

    // Inventory
    Route::get('/inventory', [InventoryController::class, 'index'])->middleware('throttle:api');
    Route::post('/inventory', [InventoryController::class, 'store'])->middleware('throttle:write');
    Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock'])->middleware('throttle:api');
    Route::get('/inventory/out-of-stock', [InventoryController::class, 'outOfStock'])->middleware('throttle:api');
    Route::get('/inventory/sku/{sku}', [InventoryController::class, 'bySku'])->middleware('throttle:api');
    Route::get('/inventory/{id}', [InventoryController::class, 'show'])->middleware('throttle:api');
    Route::put('/inventory/{id}', [InventoryController::class, 'update'])->middleware('throttle:write');
    Route::delete('/inventory/{id}', [InventoryController::class, 'destroy'])->middleware('throttle:write');

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store'])->middleware('throttle:write');
    Route::put('/reviews/{id}', [ReviewController::class, 'update'])->middleware('throttle:write');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->middleware('throttle:write');
    Route::get('/reviews/pending', [ReviewController::class, 'pending'])->middleware('throttle:api');

    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->middleware('throttle:api');
    Route::post('/settings', [SettingController::class, 'store'])->middleware('throttle:write');
    Route::get('/settings/{id}', [SettingController::class, 'show'])->middleware('throttle:api');
    Route::put('/settings/{id}', [SettingController::class, 'update'])->middleware('throttle:write');
    Route::delete('/settings/{id}', [SettingController::class, 'destroy'])->middleware('throttle:write');
    Route::get('/settings/key/{key}', [SettingController::class, 'byKey'])->middleware('throttle:api');
    Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api');

    // Analytics
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard'])->middleware('throttle:api');
    Route::get('/analytics/sales', [AnalyticsController::class, 'sales'])->middleware('throttle:api');
    Route::get('/analytics/top-products', [AnalyticsController::class, 'topProducts'])->middleware('throttle:api');
  });
});
