<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BddAntecedent extends Model
{
    use HasFactory;

    protected $fillable = ['bdd_id', 'description'];

    public function base_de_donnees()
    {
        return $this->belongsTo(BaseDeDonnee::class);
    }
}
