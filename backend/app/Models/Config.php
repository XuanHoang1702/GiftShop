<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;
    protected $table = 'config';

    protected $fillable = [
        'id',
        'site_name',
        'email',
        'address',
        'hotline',
        'phone',
        'author',
        'status'
    ];
}
