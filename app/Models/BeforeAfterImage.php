<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class BeforeAfterImage extends Model
{
    use HasFactory, \App\Traits\HasMediaCleanup;

    protected array $mediaColumns = ['before_image_path', 'after_image_path'];

    protected $fillable = [
        'title',
        'before_image_path',
        'after_image_path',
        'order',
    ];

    protected static function booted()
    {
        // HasMediaCleanup automatically hooks into 'updating' and 'deleted' events.
        
        static::created(function ($image) {
            Cache::forget('home_before_after_images');
        });

        static::updated(function ($image) {
            Cache::forget('home_before_after_images');
        });

        static::deleted(function ($image) {
            Cache::forget('home_before_after_images');
        });
    }
}
