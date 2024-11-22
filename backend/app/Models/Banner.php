<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;
    protected $table = 'banners';
    protected $fillable = [
        'id',
        'name',
        'link',
        'image',
        'sort_order',
        'position',
        'description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'status'
    ];

}
