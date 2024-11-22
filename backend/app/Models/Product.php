<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'slug',
        'category_id',
        'brand_id',
        'content',
        'description',
        'pricebuy',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class,'brand_id');
    }

    public function image()
    {
        return $this->hasMany(Productimage::class,'product_id');
    }

    public function productsale()
    {
        return $this->hasOne(Productsale::class,'product_id');
    }

    public function productstore()
    {
        return $this->hasMany(Productstore::class,'product_id');
    }

    public function orderdetail()
    {
        return $this->hasMany(Orderdetail::class,'product_id');
    }
}
