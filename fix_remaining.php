<?php
$apiFile = 'D:\\قيم للعطور\\backend\\routes\\api.php';
$api = file_get_contents($apiFile);

// Fix missing line break before inventory/sku
$api = str_replace(
    "Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock'])->middleware('throttle:api');\n    Route::get('/inventory/sku/{sku}',",
    "Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock'])->middleware('throttle:api');\n    Route::get('/inventory/out-of-stock', [InventoryController::class, 'outOfStock'])->middleware('throttle:api');\n    Route::get('/inventory/sku/{sku}',",
    $api
);

// Add offers CRUD in protected section (before analytics)
$api = str_replace(
    "Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api');\n\n    // Analytics",
    "Route::get('/settings/group/{group}', [SettingController::class, 'byGroup'])->middleware('throttle:api');\n\n    // Offers\n    Route::post('/offers', [OfferController::class, 'store'])->middleware('throttle:write');\n    Route::put('/offers/{id}', [OfferController::class, 'update'])->middleware('throttle:write');\n    Route::delete('/offers/{id}', [OfferController::class, 'destroy'])->middleware('throttle:write');\n\n    // Analytics",
    $api
);

file_put_contents($apiFile, $api);
echo "Routes fully fixed!\n";

// FIX: CORS config
$corsFile = 'D:\\قيم للعطور\\backend\\config\\cors.php';
$corsContent = "<?php\n\nreturn [\n  'paths' => ['api/*', 'sanctum/csrf-cookie'],\n  'allowed_methods' => ['*'],\n  'allowed_origins' => array_values(array_filter(array_map('trim', explode(',', env('FRONTEND_URL', ''))))),\n  'allowed_origins_patterns' => [],\n  'allowed_headers' => ['*'],\n  'exposed_headers' => [],\n  'max_age' => 600,\n  'supports_credentials' => true,\n];\n";
file_put_contents($corsFile, $corsContent);
echo "CORS config fixed!\n";

// FIX: SettingRequest
$settingFile = 'D:\\قيم للعطور\\backend\\app\\Http\\Requests\\SettingRequest.php';
$settingContent = "<?php\n\nnamespace App\\Http\\Requests;\n\nuse Illuminate\\Foundation\\Http\\FormRequest;\nuse Illuminate\\Validation\\Rule;\n\nclass SettingRequest extends FormRequest\n{\n  public function authorize(): bool\n  {\n    return \$this->user()?->tokenCan('settings:manage') ?? false;\n  }\n\n  public function rules(): array\n  {\n    \$settingId = \$this->route('id');\n\n    return [\n      'key' => ['required', 'string', 'max:255', Rule::unique('settings', 'key')->ignore(\$settingId)],\n      'value' => 'nullable|string',\n      'group' => 'nullable|string|max:255',\n    ];\n  }\n}\n";
file_put_contents($settingFile, $settingContent);
echo "SettingRequest fixed!\n";

// FIX: Create OfferRequest
$offerReqFile = 'D:\\قيم للعطور\\backend\\app\\Http\\Requests\\OfferRequest.php';
$offerReqContent = "<?php\n\nnamespace App\\Http\\Requests;\n\nuse Illuminate\\Foundation\\Http\\FormRequest;\n\nclass OfferRequest extends FormRequest\n{\n  public function authorize(): bool\n  {\n    return \$this->user()?->tokenCan('products:manage') ?? false;\n  }\n\n  public function rules(): array\n  {\n    return [\n      'product_id' => ['required', 'exists:products,id'],\n      'discount_type' => ['required', 'in:percentage,fixed'],\n      'discount_value' => ['required', 'integer', 'min:1'],\n      'starts_at' => ['nullable', 'date'],\n      'expires_at' => ['nullable', 'date', 'after:starts_at'],\n      'is_active' => ['boolean'],\n    ];\n  }\n}\n";
file_put_contents($offerReqFile, $offerReqContent);
echo "OfferRequest created!\n";

// FIX: ProductRepository search sanitization
$prodRepoFile = 'D:\\قيم للعطور\\backend\\app\\Repositories\\ProductRepository.php';
$prodRepoContent = "<?php\n\nnamespace App\\Repositories;\n\nuse App\\Models\\Product;\nuse App\\Repositories\\Contracts\\ProductRepositoryInterface;\n\nclass ProductRepository extends BaseRepository implements ProductRepositoryInterface\n{\n  public function __construct(Product \$model)\n  {\n    parent::__construct(\$model);\n  }\n\n  public function getActiveProducts()\n  {\n    return \$this->model->where('status', 'active')->get();\n  }\n\n  public function getFeaturedProducts()\n  {\n    return \$this->model->where('is_featured', true)->where('status', 'active')->get();\n  }\n\n  public function getBestSellers()\n  {\n    return \$this->model->where('is_best_seller', true)->where('status', 'active')->get();\n  }\n\n  public function getByCategory(int \$categoryId)\n  {\n    return \$this->model->where('category_id', \$categoryId)->where('status', 'active')->get();\n  }\n\n  public function getBySlug(string \$slug)\n  {\n    return \$this->model->where('slug', \$slug)->first();\n  }\n\n  public function search(string \$query)\n  {\n    \$sanitized = str_replace(['%', '_'], ['\\\\%', '\\\\_'], \$query);\n\n    return \$this->model\n      ->where(function (\$q) use (\$sanitized) {\n        \$q->where('name_ar', 'like', \"%{\$sanitized}%\")\n          ->orWhere('name_en', 'like', \"%{\$sanitized}%\");\n      })\n      ->where('status', 'active')\n      ->paginate(20);\n  }\n}\n";
file_put_contents($prodRepoFile, $prodRepoContent);
echo "ProductRepository fixed!\n";

// Move temp JSON files to backups
$backupDir = 'D:\\قيم للعطور\\.backups';
if (!is_dir($backupDir)) { mkdir($backupDir, 0777, true); }
$tempFiles = glob('D:\\قيم للعطور\\temp_*.json');
foreach ($tempFiles as $f) {
    $dest = $backupDir . DIRECTORY_SEPARATOR . basename($f) . '.bak';
    copy($f, $dest);
    unlink($f);
    echo "Moved " . basename($f) . " to .backups/\n";
}

echo "\n=== ADDITIONAL FIXES COMPLETE ===\n";
