<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\BackgroundController;
use App\Http\Controllers\Admin\ProjectRequestController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\PublicProjectController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\SitemapController;

// ——— Sitemap XML ———
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/', function () {
    // Fix #14: cache the unbounded SiteContent::all() and homepage data
    $contents = Cache::remember('home_site_contents', 600, function () {
        return \App\Models\SiteContent::all()->pluck('value', 'key');
    });
    $projects = Cache::remember('home_projects', 600, function () {
        return \App\Models\Project::latest()->take(6)->get();
    });
    $galleryImages = Cache::remember('gallery_page_home', 600, function () {
        return \App\Models\GalleryImage::where('page', 'home')->orderBy('order')->get();
    });

    $beforeAfterImages = Cache::remember('home_before_after_images', 600, function () {
        return \App\Models\BeforeAfterImage::orderBy('order')->get();
    });

    return Inertia::render('Welcome', [
        'canLogin'          => Route::has('login'),
        'canRegister'       => Route::has('register'),
        'laravelVersion'    => Application::VERSION,
        'phpVersion'        => PHP_VERSION,
        'siteContents'      => $contents,
        'projects'          => $projects,
        'galleryImages'     => $galleryImages,
        'beforeAfterImages' => $beforeAfterImages,
    ]);
})->name('home');

Route::get('/contact-us', function () {
    return Inertia::render('ContactUs');
})->name('contact');

Route::get('/services', function () {
    return Inertia::render('Public/Services/Index', [
        // Fix #5: cache projects and gallery for services index
        'projects'     => Cache::remember('services_projects', 600, fn () =>
            \App\Models\Project::latest()->take(4)->get()
        ),
        'galleryImages' => Cache::remember('gallery_page_services', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'services')->orderBy('order')->get()
        ),
    ]);
})->name('services.index');

Route::get('/services/landscaping', function () {
    // Fix #5: cache contents + gallery per page with 10-min TTL
    $contents = Cache::remember('page_contents_landscaping', 600, function () {
        return \App\Models\Content::where('page', 'تنسيق الحدائق')->get();
    });
    return Inertia::render('Public/Services/Landscaping', [
        'projects'          => Cache::remember('projects_landscaping', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%حدائق%')
                ->orWhere('title', 'like', '%حدائق%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_landscaping', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'landscaping')->orderBy('order')->get()
        ),
    ]);
})->name('services.landscaping');

Route::get('/services/design', function () {
    $contents = Cache::remember('page_contents_design', 600, function () {
        return \App\Models\Content::where('page', 'تصميم الحدائق')->get();
    });
    return Inertia::render('Public/Services/Design', [
        'projects'          => Cache::remember('projects_design', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%تصميم%')
                ->orWhere('title', 'like', '%تصميم%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_design', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'design')->orderBy('order')->get()
        ),
    ]);
})->name('services.design');

Route::get('/services/artificial-grass', function () {
    $contents = Cache::remember('page_contents_artificial_grass', 600, function () {
        return \App\Models\Content::where('page', 'العشب الصناعي')->get();
    });
    return Inertia::render('Public/Services/ArtificialGrass', [
        'projects'          => Cache::remember('projects_artificial_grass', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%عشب%')
                ->orWhere('title', 'like', '%عشب%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_artificial_grass', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'artificial_grass')->orderBy('order')->get()
        ),
    ]);
})->name('services.artificial-grass');
Route::get('/about-us', function () {
    return Inertia::render('Public/About/Index');
})->name('about');

Route::get('/our-projects', [PublicProjectController::class, 'index'])->name('our-projects.index');
Route::get('/our-projects/{project}', [PublicProjectController::class, 'show'])->name('our-projects.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Content Manager (CMS V3)
    Route::get('/contents', [\App\Http\Controllers\Admin\ContentController::class, 'index'])->name('contents.index');
    Route::post('/contents', [\App\Http\Controllers\Admin\ContentController::class, 'store'])->name('contents.store');
    Route::post('/contents/bulk-update/{page}', [\App\Http\Controllers\Admin\ContentController::class, 'bulkUpdate'])->name('contents.bulk-update');
    Route::post('/contents/{content}', [\App\Http\Controllers\Admin\ContentController::class, 'update'])->name('contents.update');
    Route::delete('/contents/{content}', [\App\Http\Controllers\Admin\ContentController::class, 'destroy'])->name('contents.destroy');

    // Site Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    // Background Management
    Route::get('/backgrounds', [BackgroundController::class, 'index'])->name('backgrounds.index');
    Route::post('/backgrounds/{content}', [BackgroundController::class, 'update'])->name('backgrounds.update');
    Route::delete('/backgrounds/{content}', [BackgroundController::class, 'destroy'])->name('backgrounds.destroy');

    // Gallery Images
    Route::get('/gallery', [\App\Http\Controllers\Admin\GalleryController::class, 'index'])->name('gallery.index');
    Route::post('/gallery', [\App\Http\Controllers\Admin\GalleryController::class, 'store'])->name('gallery.store');
    Route::post('/gallery/{gallery}', [\App\Http\Controllers\Admin\GalleryController::class, 'update'])->name('gallery.update');
    Route::delete('/gallery/{gallery}', [\App\Http\Controllers\Admin\GalleryController::class, 'destroy'])->name('gallery.destroy');

    // Before/After Gallery
    Route::get('/before-after', [\App\Http\Controllers\Admin\BeforeAfterController::class, 'index'])->name('before-after.index');
    Route::post('/before-after', [\App\Http\Controllers\Admin\BeforeAfterController::class, 'store'])->name('before-after.store');
    Route::post('/before-after/{beforeAfter}', [\App\Http\Controllers\Admin\BeforeAfterController::class, 'update'])->name('before-after.update');
    Route::delete('/before-after/{beforeAfter}', [\App\Http\Controllers\Admin\BeforeAfterController::class, 'destroy'])->name('before-after.destroy');

    // Portfolio Projects (CMS)
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Blog Management
    Route::resource('posts', AdminPostController::class);
    Route::post('posts/{post}/toggle-publish', [AdminPostController::class, 'togglePublish'])->name('posts.toggle-publish');


    // Project Requests (Form Submissions)
    Route::get('/project-requests', [ProjectRequestController::class, 'index'])->name('project-requests.index');
    Route::put('/project-requests/{projectRequest}/status', [ProjectRequestController::class, 'updateStatus'])->name('project-requests.status');
    Route::delete('/project-requests/{projectRequest}', [ProjectRequestController::class, 'destroy'])->name('project-requests.destroy');

    Route::get('/content', [SiteContentController::class, 'index'])->name('content.index');
    Route::post('/content', [SiteContentController::class, 'store'])->name('content.store');
    Route::delete('/content/{siteContent}', [SiteContentController::class, 'destroy'])->name('content.destroy');

    // Home Video Management
    Route::get('/home-video', [\App\Http\Controllers\Admin\HomeVideoController::class, 'index'])->name('home-video.index');
    Route::post('/home-video', [\App\Http\Controllers\Admin\HomeVideoController::class, 'update'])->name('home-video.update');
});

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified', 'admin'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar'])->name('profile.avatar.upload');
    Route::delete('/profile/avatar', [ProfileController::class, 'removeAvatar'])->name('profile.avatar.remove');
});

require __DIR__.'/auth.php';
