<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    use \App\Traits\HasMediaCleanup;

    protected array $mediaColumns = ['value'];

    protected $fillable = [
        'key',
        'type',
        'value'
    ];
}
