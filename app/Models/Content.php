<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Content extends Model
{
    use HasFactory, \App\Traits\HasMediaCleanup;

    protected array $mediaColumns = ['value'];

    protected $fillable = [
        'page',
        'section',
        'key',
        'type',
        'value',
        'extra_value',
        'status',
        'created_by',
    ];

    /**
     * FIX #1 (Cache Invalidation): Automatically bust the content cache
     * whenever a Content record is created, updated, or deleted.
     */
    protected static function booted(): void
    {
        $clearCache = function () {
            Cache::forget('published_page_contents');
            Cache::forget('admin_contents_index');
        };

        static::created($clearCache);
        static::updated($clearCache);
        static::deleted($clearCache);
    }
}
