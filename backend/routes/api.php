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
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Categories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/status/{status}', [OrderController::class, 'byStatus']);
    Route::get('/orders/customer/{customerId}', [OrderController::class, 'byCustomer']);
    Route::get('/orders/recent', [OrderController::class, 'recent']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/vip', [CustomerController::class, 'vip']);
    Route::get('/customers/email/{email}', [CustomerController::class, 'byEmail']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    // Inventory
    Route::get('/inventory', [InventoryController::class, 'index']);
    Route::post('/inventory', [InventoryController::class, 'store']);
    Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock']);
    Route::get('/inventory/out-of-stock', [InventoryController::class, 'outOfStock']);
    Route::get('/inventory/sku/{sku}', [InventoryController::class, 'bySku']);
    Route::get('/inventory/{id}', [InventoryController::class, 'show']);
    Route::put('/inventory/{id}', [InventoryController::class, 'update']);
    Route::delete('/inventory/{id}', [InventoryController::class, 'destroy']);

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store'])->middleware('throttle:10,1');
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::get('/reviews/pending', [ReviewController::class, 'pending']);

    // Settings
    Route::get('/settings', [SettingController::class, 'index']);
    Route::post('/settings', [SettingController::class, 'store']);
    Route::get('/settings/{id}', [SettingController::class, 'show']);
    Route::put('/settings/{id}', [SettingController::class, 'update']);
    Route::delete('/settings/{id}', [SettingController::class, 'destroy']);
    Route::get('/settings/key/{key}', [SettingController::class, 'byKey']);
    Route::get('/settings/group/{group}', [SettingController::class, 'byGroup']);

    // Analytics
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard']);
    Route::get('/analytics/sales', [AnalyticsController::class, 'sales']);
    Route::get('/analytics/top-products', [AnalyticsController::class, 'topProducts']);
  });
});
