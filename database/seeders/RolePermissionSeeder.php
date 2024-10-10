<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Permission::query()->delete();
        // Création des Permissions
        $permissions = [
            'officer',
            'historique',
            'dashboard',
            'loyaute',
            'viewAll',

            //user
            'createUser',
            'viewUser',
            'editUser',
            'deleteUser',
            'editLife',
            'editMedailles',
            'editAntecedentsUser',

            //Base de données
            'viewBDD',
            'addBDD',
            'editBDD',
            'editAntecedentsBDD',
            'deleteBDD',


            //Absences
            'addAbsence',
            'viewAbsence',

        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Création du Rôle Dev
        $roleHockwood = Role::create(['name' => 'Hockwood']);
        $roleHockwood->givePermissionTo(Permission::all());

        // Création des Rôles hiérarchiques
        $roleEM = Role::create(['name' => 'Etat Major']);
        $roleEM->givePermissionTo(['officer', 'dashboard', 'viewAll', 'viewUser', 'editMedailles']);

        $roleLeader = Role::create(['name' => 'Leader']);
        $roleLeader->givePermissionTo(Permission::all());

        $roleKing = Role::create(['name' => 'King']);
        $roleKing->givePermissionTo(['officer', 'dashboard', 'viewBDD', 'viewAbsence', 'viewUser', 'editUser', 'editMedailles', 'editBDD', 'editAntecedentsBDD', 'editAntecedentsUser']);

        $roleKnight = Role::create(['name' => 'Knight']);
        $roleKnight->givePermissionTo(['officer', 'dashboard', 'viewBDD', 'viewAbsence', 'viewUser', 'editUser', 'editMedailles', 'editBDD', 'editAntecedentsBDD', 'editAntecedentsUser']);

        $roleMage = Role::create(['name' => 'Mage']);
        $roleMage->givePermissionTo(['officer', 'dashboard', 'viewBDD', 'viewAbsence', 'viewUser', 'editMedailles', 'editBDD', 'editAntecedentsBDD']);

        $roleElite = Role::create(['name' => 'Elite']);
        $roleElite->givePermissionTo(['addAbsence', 'addBDD', 'editAntecedentsBDD']);

        $roleEcho = Role::create(['name' => 'Echo']);
        $roleEcho->givePermissionTo(['addAbsence', 'addBDD', 'editAntecedentsBDD']);

        $roleNova = Role::create(['name' => 'Nova']);
        $roleNova->givePermissionTo(['addAbsence', 'addBDD', 'editAntecedentsBDD']);

        $roleWhisper = Role::create(['name' => 'Whisper']);
        $roleWhisper->givePermissionTo(['addAbsence']);

        // Création des Rôles de Spécialisation

        $roleExecutor = Role::create(['name' => 'Executor']);
        $roleExecutor->givePermissionTo(['loyaute', 'editBDD', 'dashboard']);

        $roleGuardian = Role::create(['name' => 'Guardian']);
        $roleGuardian->givePermissionTo([]);

        $roleGhost = Role::create(['name' => 'Ghost']);
        $roleGhost->givePermissionTo(['editBDD']);

        $roleSpirits = Role::create(['name' => 'Spirits']);
        $roleSpirits->givePermissionTo([]);

        $roleSector = Role::create(['name' => 'Sector']);
        $roleSector->givePermissionTo([]);

        $roleNA = Role::create(['name' => 'N/A']);
        $roleNA->givePermissionTo([]);

        // Création des rôles par default

        $roleSpectre = Role::create(['name' => 'Spectre']);
        $roleSpectre->givePermissionTo([]);

    }
    
}
