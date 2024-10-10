<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medal extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'role', 'image'];

    public function user_medal()
    {
        return $this->hasMany(user_medal::class);
    }
}
