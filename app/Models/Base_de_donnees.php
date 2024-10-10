<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class base_de_donnees extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'nom', 'prenom','matricule', 'grade', 'branche', 'GI', 'groupe' ,'status', 'steam_id', 'lien_photo'];

    public function bdd_antecedent()
    {
        return $this->hasMany(bdd_antecedent::class);
    }
}
