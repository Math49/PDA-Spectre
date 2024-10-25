<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\SpectreData;

class HockwoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'username' => 'Hockwood',
            'password' => Hash::make('123456789'),
        ]);

        $spectreData = SpectreData::create([
            'user_id' => $user->id,
            'STEAM_ID' => "76561198845579992",
            'matricule' => 0000,
            'loyauté' => 100,
            'vie' => 3,
        ]);

        $user->syncRoles(['Hockwood', 'Etat Major']);

        new Registered($user, $spectreData);
    }
}

