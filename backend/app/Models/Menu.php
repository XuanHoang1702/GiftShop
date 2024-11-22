<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    protected $table = 'menu';
    protected $fillable =[
        'id',
        'name',
        'link',
        'table_id',
        'type',
        'position',
        'parent_id',
        'sort_order',
        'description',
        'status'
    ];
    public function parentMenu()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Nếu một danh mục có thể có nhiều danh mục con (child categories)
    public function childMenu()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

}
