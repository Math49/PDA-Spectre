<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_medal extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'medal_id', 'is_active'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function medal()
    {
        return $this->belongsTo(Medal::class);
    }
}
