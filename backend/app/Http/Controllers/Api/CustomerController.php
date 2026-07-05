<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Http\Requests\CustomerRequest;
use App\Services\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
  private CustomerService $customerService;

  public function __construct(CustomerService $customerService)
  {
    $this->customerService = $customerService;
  }

  public function index()
  {
    return CustomerResource::collection($this->customerService->getAll());
  }

  public function store(CustomerRequest $request)
  {
    $customer = $this->customerService->create($request->validated());
    return new CustomerResource($customer);
  }

  public function show(int $id)
  {
    $customer = $this->customerService->find($id);
    return new CustomerResource($customer);
  }

  public function update(CustomerRequest $request, int $id)
  {
    $customer = $this->customerService->update($id, $request->validated());
    return new CustomerResource($customer);
  }

  public function destroy(int $id)
  {
    $this->customerService->delete($id);
    return response()->json(null, 204);
  }

  public function vip()
  {
    return CustomerResource::collection($this->customerService->getVIPCustomers());
  }

  public function byEmail(string $email)
  {
    $customer = $this->customerService->getByEmail($email);
    return new CustomerResource($customer);
  }
}