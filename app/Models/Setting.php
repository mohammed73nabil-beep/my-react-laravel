<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use \App\Traits\HasMediaCleanup;

    protected array $mediaColumns = ['value'];

    protected $fillable = ['key', 'value', 'type', 'group'];

    protected static function booted(): void
    {
        $clear = function (self $setting): void {
            Cache::forget('global_settings');

            if (! empty($setting->key)) {
                Cache::forget('setting_' . $setting->key);
            }
        };

        static::created($clear);
        static::updated($clear);
        static::deleted($clear);
    }
}
