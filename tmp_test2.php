<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$requestData = [
    "settings" => [
        [
            "key" => "site_name",
            "type" => "text",
            "group" => "general",
            "value" => "My Test Name!"
        ]
    ]
];

$request = Illuminate\Http\Request::create('/admin/settings', 'POST', $requestData);

// Bypass Auth and validation by instantiating controller directly and passing a mock request
$controller = new \App\Http\Controllers\Admin\SettingController();
try {
    $result = $controller->update($request);
    echo "SUCCESS\n";
    print_r(\App\Models\Setting::where('key', 'site_name')->first()->toArray());
} catch (\Exception $e) {
    echo "EXCEPTION:\n";
    echo $e->getMessage() . "\n" . $e->getTraceAsString();
}
