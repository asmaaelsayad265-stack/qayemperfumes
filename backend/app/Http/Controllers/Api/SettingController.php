<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Http\Requests\SettingRequest;
use App\Services\SettingService;
use Illuminate\Http\Request;

class SettingController extends Controller
{
  private SettingService $settingService;

  public function __construct(SettingService $settingService)
  {
    $this->settingService = $settingService;
  }

  public function index()
  {
    return SettingResource::collection($this->settingService->getAll());
  }

  public function store(SettingRequest $request)
  {
    $setting = $this->settingService->create($request->validated());
    return new SettingResource($setting);
  }

  public function show(int $id)
  {
    $setting = $this->settingService->find($id);
    return new SettingResource($setting);
  }

  public function update(SettingRequest $request, int $id)
  {
    $setting = $this->settingService->update($id, $request->validated());
    return new SettingResource($setting);
  }

  public function destroy(int $id)
  {
    $this->settingService->delete($id);
    return response()->json(null, 204);
  }

  public function byKey(string $key)
  {
    $value = $this->settingService->getByKey($key);
    return response()->json(['value' => $value]);
  }

  public function byGroup(string $group)
  {
    return SettingResource::collection($this->settingService->getByGroup($group));
  }
}