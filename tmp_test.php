<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create('/admin/settings', 'POST', [
    'settings' => [
        [
            'key' => 'site_name',
            'value' => 'My Test Site',
            'type' => 'text',
            'group' => 'general',
            'file' => '' // Simulate FormData sending empty string for null
        ]
    ]
]);

// We need to bypass Auth, or just test the Validator manually
$validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
    'settings' => 'required|array',
    'settings.*.key' => 'required|string',
    'settings.*.value' => 'nullable',
    'settings.*.type' => 'required|string',
    'settings.*.group' => 'required|string',
    'settings.*.file' => 'nullable|file|image|max:2048',
]);

if ($validator->fails()) {
    echo "FAILED:\n";
    print_r($validator->errors()->toArray());
} else {
    echo "PASSED\n";
    print_r($validator->validated());
}
