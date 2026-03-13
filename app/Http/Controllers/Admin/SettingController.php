<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
class SettingController extends Controller
{
    /**
     * Display the settings grouped by their respective categories.
     */
    public function index()
    {
        $settings = Setting::all()->groupBy('group')->mapWithKeys(function ($items, $group) {
            return [$group => $items->mapWithKeys(function ($item) {
                return [$item->key => $item];
            })];
        });

        // Structure defaults if table is empty
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }
    /**
     * Update the given settings.
     */
    public function update(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Settings Update Request:', $request->all());
        try {
            $data = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string',
                'settings.*.value' => 'nullable',
                'settings.*.type' => 'required|string',
                'settings.*.group' => 'required|string',
                'settings.*.file' => 'nullable|file|image|max:2048',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Settings validation failed:', $e->errors());
            throw $e;
        }

        foreach ($data['settings'] as $index => $settingData) {
            $setting = Setting::firstOrNew(['key' => $settingData['key']]);
            $setting->type = $settingData['type'];
            $setting->group = $settingData['group'];

            if ($settingData['type'] === 'image' && $request->hasFile("settings.{$index}.file")) {
                // Delete old file if exists
                if ($setting->value) {
                    Storage::disk('public')->delete($setting->value);
                }
                $path = $request->file("settings.{$index}.file")->store('settings', 'public');
                $setting->value = $path;
            } elseif ($settingData['type'] !== 'image') {
                $setting->value = $settingData['value'] ?? null;
            }

            $setting->save();
            
            // Clear the specific cache for this setting
            Cache::forget('setting_' . $setting->key);
        }

        \Illuminate\Support\Facades\Log::info("Settings updated successfully!");
        return redirect()->back()->with('message', 'Settings updated successfully.');
    }
}
