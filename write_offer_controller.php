<?php
file_put_contents(
    'D:\\قيم للعطور\\backend\\app\\Http\\Controllers\\Api\\OfferController.php',
    '<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfferRequest;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;

class OfferController extends Controller
{
  public function index(): JsonResponse
  {
    $offers = Offer::with(\'product:id,name_ar,name_en,slug,image,price,original_price\')->get();
    return response()->json([\'data\' => $offers]);
  }

  public function active(): JsonResponse
  {
    $offers = Offer::with(\'product:id,name_ar,name_en,slug,image,price,original_price\')
      ->where(\'is_active\', true)
      ->where(\'starts_at\', \'<=\', now())
      ->where(function ($query) {
        $query->whereNull(\'expires_at\')->orWhere(\'expires_at\', \'>=\', now());
      })
      ->get();
    return response()->json([\'data\' => $offers]);
  }

  public function store(OfferRequest $request): JsonResponse
  {
    $offer = Offer::create($request->validated());
    return response()->json([\'data\' => $offer], 201);
  }

  public function show(int $id): JsonResponse
  {
    $offer = Offer::with(\'product\')->findOrFail($id);
    return response()->json([\'data\' => $offer]);
  }

  public function update(OfferRequest $request, int $id): JsonResponse
  {
    $offer = Offer::findOrFail($id);
    $offer->update($request->validated());
    return response()->json([\'data\' => $offer]);
  }

  public function destroy(int $id): JsonResponse
  {
    $offer = Offer::findOrFail($id);
    $offer->delete();
    return response()->json(null, 204);
  }
}
'
);
echo "OfferController written successfully\n";
