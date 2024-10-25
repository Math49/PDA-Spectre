<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\SpectreData;
use Illuminate\Support\Str;
use Psy\Readline\Hoa\Console;

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
            'id' => Str::uuid(),
            'username' => 'Hockwood',
            'password' => Hash::make('123456789'),
        ]);

        echo "$user";

        $user->syncRoles(['Hockwood', 'Etat Major']);
        new Registered($user);

        $spectreData = SpectreData::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'STEAM_ID' => "76561198845579992",
            'matricule' => 0000,
            'loyauté' => 100,
            'vie' => 3,
        ]);


        new Registered($spectreData);
    }
}

