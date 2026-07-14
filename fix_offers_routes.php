<?php
$apiFile = 'D:\\قيم للعطور\\backend\\routes\\api.php';
$api = file_get_contents($apiFile);

// Add offers CRUD in protected section (before analytics)
$search = "Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api');\n\n    // Analytics";
$replace = "Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api');\n\n    // Offers\n    Route::post('/offers', [OfferController::class, 'store'])->middleware('throttle:write');\n    Route::put('/offers/{id}', [OfferController::class, 'update'])->middleware('throttle:write');\n    Route::delete('/offers/{id}', [OfferController::class, 'destroy'])->middleware('throttle:write');\n\n    // Analytics";

$api = str_replace($search, $replace, $api);
file_put_contents($apiFile, $api);
echo "Protected offers routes added successfully!\n";

// Verify
$api2 = file_get_contents($apiFile);
if (strpos($api2, "Route::post('/offers'") !== false) {
    echo "Verification: Protected offers routes are present.\n";
} else {
    echo "WARNING: Protected offers routes could not be added!\n";
}
