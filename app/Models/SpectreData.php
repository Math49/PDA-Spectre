<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpectreData extends Model
{
    protected $fillable = [
        'user_id',
        'STEAM_ID',
        'matricule',
        'loyauté',
        'vie',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
