<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productstore extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'product_store';

    protected $fillable = [
        'id',
        'product_id',
        'priceroot',
        'qty',
        'dateimport',
        'status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }
}
