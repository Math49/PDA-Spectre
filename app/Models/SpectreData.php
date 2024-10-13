<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpectreData extends Model
{
    protected $fillable = [
        'user_id' => 'interger',
        'STEAM_ID' => 'string',
        'matricule' => 'interger',
        'loyauté' => 'interger',
        'vie' => 'interger',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
