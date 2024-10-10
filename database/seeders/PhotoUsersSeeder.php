<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PhotoUser;

class PhotoUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PhotoUser::create([
            'lien' => '/images/users/Default.png',
            'role_accept' => '',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Executor.png',
            'role_accept' => 'Executor',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Ghost.png',
            'role_accept' => 'Ghost',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Guardian.png',
            'role_accept' => 'Guardian',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Leader.png',
            'role_accept' => 'Leader',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Sector.png',
            'role_accept' => 'Sector',
        ]);

        PhotoUser::create([
            'lien' => '/images/users/Spirits.png',
            'role_accept' => 'Spirits',
        ]);
    }
}
