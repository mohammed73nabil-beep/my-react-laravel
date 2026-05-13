<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class HomeVideoController extends Controller
{
    public function index()
    {
        $videoContents = Content::where('key', 'like', 'home.video.%')->get()
            ->pluck('value', 'key');

        return Inertia::render('Admin/HomeVideo', [
            'videoContents' => $videoContents
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            if ($key === 'home.video.thumbnail' && $request->hasFile('home.video.thumbnail')) {
                $path = $request->file('home.video.thumbnail')->store('site_images', 'public');
                Content::updateOrCreate(
                    ['key' => $key],
                    [
                        'page' => 'الرئيسية',
                        'section' => 'فيديو الأعمال',
                        'type' => 'image',
                        'value' => $path,
                        'status' => 'published'
                    ]
                );
            } else if (in_array($key, ['home.video.url', 'home.video.title', 'home.video.subtitle'])) {
                Content::updateOrCreate(
                    ['key' => $key],
                    [
                        'page' => 'الرئيسية',
                        'section' => 'فيديو الأعمال',
                        'type' => 'text',
                        'value' => $value ?? '',
                        'status' => 'published'
                    ]
                );
            }
        }

        Cache::forget('published_page_contents');

        return back()->with('success', 'تم تحديث بيانات الفيديو بنجاح!');
    }
}
