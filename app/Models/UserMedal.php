<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMedal extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'medal_id', 'is_active'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Medal()
    {
        return $this->belongsTo(Medal::class);
    }
}
