<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $table = 'topic';
    protected $fillable = [
        'id',
        'name',
        'slug',
        'sort_order',
        'description',
        'pricebuy',
        'status',
    ];

    public function post()
    {
        return $this->hasMany(Post::class, 'topic_id');
    }
}
