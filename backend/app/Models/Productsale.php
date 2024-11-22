<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productsale extends Model
{
    use HasFactory;
    protected $table = 'product_sale';
    protected $fillable = [
        'id',
        'product_id',
        'pricesale',
        'datebegin',
        'dateend',
        'status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
