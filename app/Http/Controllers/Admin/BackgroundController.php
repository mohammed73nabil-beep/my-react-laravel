<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageOptimizer;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BackgroundController extends Controller
{
    /**
     * مفاتيح الـ cache لكل صفحة في web.php.
     * عند تغيير خلفية أي صفحة يجب مسح الـ cache الخاص بها.
     */
    protected array $pageCacheKeys = [
        'page_contents_artificial_grass',
        'page_contents_water_features',
        'page_contents_pergolas',
        'page_contents_landscaping',
        'page_contents_design',
        'home_site_contents',
        'home_projects',
        'services_projects',
        'projects_artificial_grass',
        'projects_water_features',
        'projects_pergolas',
        'projects_landscaping',
        'projects_design',
        'published_page_contents',
        'admin_contents_index',
    ];

    public function index()
    {
        $contents = Content::where('type', 'image')
            ->get()
            ->filter(function ($content) {
                return str_contains(strtolower($content->key), 'hero.image') ||
                       str_contains(strtolower($content->key), 'background_image') ||
                       str_contains(strtolower($content->key), 'cta_bg') ||
                       str_contains(strtolower($content->key), 'hero_bg') ||
                       str_contains(strtolower($content->key), 'cta.background') ||
                       str_contains(strtolower($content->key), 'why.image') ||
                       str_contains(strtolower($content->key), 'contact.header.image') ||
                       str_contains(strtolower($content->key), 'background');
            })
            ->groupBy('page');

        return Inertia::render('Admin/Backgrounds/Index', [
            'backgroundPages' => $contents
        ]);
    }

    public function update(Request $request, Content $content)
    {
        $request->validate([
            'image'   => 'nullable|image|max:10240',
            'opacity' => 'required|numeric|min:0|max:100',
        ]);

        if ($request->hasFile('image')) {
            $oldPath = ($content->value && !str_starts_with($content->value, 'http') && !str_starts_with($content->value, '/images/'))
                ? $content->value
                : null;

            $content->value = ImageOptimizer::storeAsWebP(
                $request->file('image'),
                'backgrounds',
                1280, 720, 65,
                $oldPath
            );
        }

        $content->extra_value = $request->input('opacity');
        $content->save();

        // ✅ مسح جميع مفاتيح الكاش المرتبطة بالصفحات
        $this->clearAllPageCaches();

        return redirect()->back()->with('success', 'تم تحديث الخلفية وتعديل الشفافية بنجاح.');
    }

    public function destroy(Content $content)
    {
        if ($content->value && !str_starts_with($content->value, 'http') && !str_starts_with($content->value, '/images/')) {
            Storage::disk('public')->delete($content->value);
        }

        $content->value = null;
        $content->save();

        // ✅ مسح جميع مفاتيح الكاش المرتبطة بالصفحات
        $this->clearAllPageCaches();

        return redirect()->back()->with('success', 'تم إزالة الصورة بنجاح وتفريغ قيمتها من قاعدة البيانات.');
    }

    /**
     * يمسح جميع مفاتيح الـ cache الخاصة بالصفحات العامة.
     */
    protected function clearAllPageCaches(): void
    {
        foreach ($this->pageCacheKeys as $key) {
            Cache::forget($key);
        }
    }
}

