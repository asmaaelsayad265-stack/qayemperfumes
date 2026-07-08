<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
  private OrderService $orderService;

  public function __construct(OrderService $orderService)
  {
    $this->orderService = $orderService;
  }

  public function index()
  {
    return OrderResource::collection($this->orderService->getAll());
  }

  public function store(OrderRequest $request)
  {
    $order = $this->orderService->create($request->validated());
    return new OrderResource($order);
  }

  public function show(int $id)
  {
    $order = $this->orderService->find($id);
    abort_if(!$order, 404);
    return new OrderResource($order);
  }

  public function update(OrderRequest $request, int $id)
  {
    $order = $this->orderService->update($id, $request->validated());
    return new OrderResource($order);
  }

  public function destroy(int $id)
  {
    $this->orderService->delete($id);
    return response()->json(null, 204);
  }

  public function byStatus(string $status)
  {
    return OrderResource::collection($this->orderService->getByStatus($status));
  }

  public function byCustomer(int $customerId)
  {
    return OrderResource::collection($this->orderService->getByCustomer($customerId));
  }

  public function recent()
  {
    return OrderResource::collection($this->orderService->getRecentOrders());
  }
}