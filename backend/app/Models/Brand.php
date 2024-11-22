<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $table = 'brands';
    protected $fillable = [
        'id',
        'name',
        'slug',
        'thumbnail',
        'sort_order',
        'description',
        'created_by',
        'updated_by',
        'status'
    ];

    public function products()
    {
        return $this->hasMany(Product::class,'brand_id');
    }
}
