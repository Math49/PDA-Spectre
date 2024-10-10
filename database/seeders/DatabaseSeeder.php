<?php

namespace Database\Seeders;

use App\Models\Medal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\HockwoodSeeder;
use Database\Seeders\RolePermissionSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */

    public function run()
    {
        $this->call([
            RolePermissionSeeder::class,
            HockwoodSeeder::class,
            MedalSeeder::class,
            PhotoUsersSeeder::class,
        ]);
    }
}
