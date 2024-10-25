<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserMedal;

class Medal extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'role', 'image'];

    public function UserMedal()
    {
        return $this->hasMany(UserMedal::class);
    }
}
