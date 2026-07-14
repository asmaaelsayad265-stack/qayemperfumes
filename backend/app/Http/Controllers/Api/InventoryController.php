<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InventoryResource;
use App\Http\Requests\InventoryRequest;
use App\Services\InventoryService;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
  private InventoryService $inventoryService;

  public function __construct(InventoryService $inventoryService)
  {
    $this->inventoryService = $inventoryService;
  }

  public function index()
  {
    return InventoryResource::collection($this->inventoryService->getAll());
  }

  public function store(InventoryRequest $request)
  {
    $inventory = $this->inventoryService->create($request->validated());
    return new InventoryResource($inventory);
  }

  public function show(int $id)
  {
    $inventory = $this->inventoryService->find($id);
    abort_if(!$inventory, 404);
    return new InventoryResource($inventory);
  }

  public function update(InventoryRequest $request, int $id)
  {
    $inventory = $this->inventoryService->update($id, $request->validated());
    return new InventoryResource($inventory);
  }

  public function destroy(int $id)
  {
    $this->inventoryService->delete($id);
    return response()->json(null, 204);
  }

  public function lowStock()
  {
    return InventoryResource::collection($this->inventoryService->getLowStockItems());
  }

  public function outOfStock()
  {
    return InventoryResource::collection($this->inventoryService->getOutOfStockItems());
  }

  public function bySku(string $sku)
  {
    $inventory = $this->inventoryService->getBySku($sku);
    abort_if(!$inventory, 404);
    return new InventoryResource($inventory);
  }
}