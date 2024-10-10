<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bdd_antecedent extends Model
{
    use HasFactory;

    protected $fillable = ['bdd_id', 'description'];

    public function base_de_donnees()
    {
        return $this->belongsTo(base_de_donnees::class);
    }
}
