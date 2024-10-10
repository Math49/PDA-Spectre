<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\SpectreData;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use App\Models\Medal;
use App\Models\user_medal;
use App\Models\user_antecedent;
use App\Models\absence;
use Carbon\Carbon;
use App\Models\base_de_donnees;
use App\Models\bdd_antecedent;
use App\Models\historique;
use App\Models\PhotoUser;
use Illuminate\Support\Facades\Storage;

class Spectre_Data extends Controller
{   
    public function index()
    {

        $spectre = SpectreData::where('user_id', Auth::id())->first();
        $antecedents = user_antecedent::where('user_id', Auth::id())->get();
        $medalsList = user_medal::where('user_id', Auth::id())->where('is_active', 1)->get();
        $medals = Medal::all();


        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();


        $photoUser = null;

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $data = [
            'spectre' => $spectre,
            'antecedents' => $antecedents,
            'medalsList' => $medalsList,
            'medals' => $medals,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
            ],
        ];

        return Inertia::render('Welcome', [
            'data' => $data,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                    'photo' => $photoUser,
                ],
            ],
        ]);
    }

    public function dashboard()
    {

        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();
        $users = User::with('roles')->get();
        
        
        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $photoUser = null;

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Dashboard',[
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                    'photo' => $photoUser,
                ],
            ],
            'header' => $header,
        ]);
    }

    public function userlist()
    {
        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Consultation de la liste des utilisateurs";
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        foreach ($roles as $role) {
            $photoUser = PhotoUser::where('role_accept', $role->name)->first();
        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Users/UsersList', [
            'users' => $users,
            'SpectreData' => $SpectreData,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
            'photos' => PhotoUser::all(),
        ]);
    }

    public function usercreate()
    {

        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Users/UsersCreate', [
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }

    public function useredit($id)
    {
        $user = User::with('roles')->find($id);
        $data = SpectreData::where('user_id', $id)->first();
        $medal = Medal::all();
        $userMedals = user_medal::where('user_id', $id)->get();
        $antecedents = user_antecedent::where('user_id', $id)->get();

        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();
        $users = User::with('roles')->get();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Consultation de la fiche de SPECTRE-" . $data->matricule;
        $historique->save();

        $userRole = $user->roles;
        $photoUser = null;


        foreach ($userRole as $role) {
            $photoUser = PhotoUser::where('role_accept', $role->name)->first();
        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        foreach ($roles as $role) {
            $photoAuth = PhotoUser::where('role_accept', $role->name)->first();
        }

        if ($photoAuth) {
            $photoAuth = $photoAuth->lien;
        } else {
            $photoAuth = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoAuth,
            ],
        ];

        return Inertia::render('Users/UsersEdit', [
            'user' => $user,
            'data' => $data,
            'medals' => $medal,
            'userMedals' => $userMedals,
            'antecedents' => $antecedents,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
            'photo' => $photoUser,
        ]);
    }

    public function userupdate(Request $request, $id)
    {
        $request->validate([
            'data' => 'required',
        ]);

        $data = $request->data;
        $user = User::findOrFail($id);
        $user->save();

        $spectre = SpectreData::where('user_id', $id)->first();


        if ($data['matricule'] || $data['loyaute']) {
            $spectreData = SpectreData::where('user_id', $id)->first();
            if ($data['matricule']) {
                $spectreData->matricule = $data['matricule'];
            }
            $spectreData->save();
        }

        if ($data['grade'] || $data['specialisation']) {
            $roles = [];
            if ($data['grade']) {
                $roles[0] = $data['grade'];
            }
            if ($data['specialisation']) {
                $roles[1] = $data['specialisation'];
            }
            $user->syncRoles($roles);
        }


        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Modification des informations de SPECTRE-" . $spectre->matricule;
        $historique->save();

        return redirect()->route('editUser', [
            'id' => $id,
    ])->with('success', 'SPECTRE-' . $spectre->matricule . ' modifié avec succès');
    }

    public function updateUserMedal(Request $request, $id)
    {
        $request->validate([
            'medal_id' => 'required',
            'is_active' => 'required',
        ]);

        $medal_id = $request->medal_id;
        $is_active = $request->is_active;
        $user = User::findOrFail($id);
        $user->save();

        $userMedal = user_medal::where('user_id', $id)->where('medal_id', $medal_id)->first();
        if ($userMedal) {
            $userMedal->is_active = $is_active;
            $userMedal->save();
        } else {
            $userMedal = new user_medal();
            $userMedal->user_id = $id;
            $userMedal->medal_id = $medal_id;
            $userMedal->is_active = $is_active;
            $userMedal->save();
        }

        $spectreData = SpectreData::where('user_id', $id)->first();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Modification des médailles de SPECTRE-" . $spectreData->matricule;
        $historique->save();

        return redirect()->route('editUser', [
            'id' => $id,
        ])->with('success', 'Médailles de SPECTRE-' . $spectreData->matricule . ' modifiée avec succès');
    }

    public function updateUserLife(Request $request, $id)
    {
        $request->validate([
            'vie' => 'required',
        ]);

        $life = $request->vie;
        $user = User::findOrFail($id);
        $user->save();

        $spectreData = SpectreData::where('user_id', $id)->first();
        $spectreData->vie = $life;
        $spectreData->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Modification de la vie de SPECTRE-" . $spectreData->matricule;
        $historique->save();

        return redirect()->route('editUser', [
            'id' => $id
        ])->with('success', 'Vie de SPECTRE-' . $spectreData->matricule . ' modifiée avec succès');
    }

    public function addUserAntecedents(Request $request, $id)
    {
        $request->validate([
            'description' => 'required',
        ]);


        $description = $request->description;
        $user = User::findOrFail($id);
        $user->save();

        $userAntecedent = new user_antecedent();
        $userAntecedent->user_id = $id;
        $userAntecedent->description = $description;
        $userAntecedent->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());

        $spectreData = SpectreData::where('user_id', $id)->first();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Ajout d'un antécédent pour SPECTRE-" . $spectreData->matricule;
        $historique->save();

        return redirect()->route('editUser', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Antécédent ajouté avec succès à SPECTRE-' . $spectreData->matricule);
    }

    public function deleteUserAntecedents($id, $ant_id)
    {
        $userAntecedent = user_antecedent::findOrFail($ant_id);
        $spectreData = SpectreData::where('user_id', $id)->first();
        $userAntecedent->delete();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Suppression d'un antécédent à SPECTRE-" . $spectreData->matricule;
        $historique->save();

        return redirect()->route('editUser', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Antécédent supprimé avec succès');
    }

    public function deleteUser($id)
    {

        $user = User::findOrFail($id);
        
        $spectreData = SpectreData::where('user_id', $id)->first();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "user";
        $historique->description = "Suppression du compte de SPECTRE-" . $spectreData->matricule;

        $userMedals = user_medal::where('user_id', $id)->get();
        foreach ($userMedals as $userMedal) {
            $userMedal->delete();
        }
        
        $userAntecedents = user_antecedent::where('user_id', $id)->get();
        foreach ($userAntecedents as $userAntecedent) {
            $userAntecedent->delete();
        }
        
        $matricule = $spectreData->matricule;

        $spectreData->delete();
        $user->delete();

        
        return redirect()->route('usersList')->with('success', 'SPECTRE-' . $matricule . ' supprimé avec succès');
    }

    public function loyauteView()
    {
        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "loyauté";
        $historique->description = "Consultation de la loyauté";
        $historique->save();

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Loyaute/LoyauteView', [
            'users' => $users,
            'SpectreData' => $SpectreData,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }

    public function updateLoyaute(Request $request, $id)
    {
        $request->validate([
            'loyaute' => 'required',
            'raison' => 'required',
        ]);

        $loyaute = $request->loyaute;
        $raison = $request->raison;
        $user = User::findOrFail($id);
        $user->save();

        $userAntecedent = new user_antecedent();
        $userAntecedent->user_id = $id;
        $userAntecedent->description = "Mise à jour de la loyauté, de " . $user->spectreData->loyauté . " à " . $loyaute . " pour la raison suivante : " . $raison;
        $userAntecedent->save();

        $spectreData = SpectreData::where('user_id', $id)->first();
        $spectreData->loyauté = $loyaute;
        $spectreData->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "loyauté";
        $historique->description = "Modification de la loyauté de " . $spectreData->matricule;
        $historique->save();

        return redirect()->route('loyaute')->with('success', 'Loyauté de SPECTRE-' . $spectreData->matricule . ' modifiée avec succès');
    }

    public function absenceView()
    {

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "absence";
        $historique->description = "Consultation des absences User";
        $historique->save();

        return Inertia::render('Absence/AbsenceUser',[
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ]);
    }

    public function absenceStore(Request $request, $id)
    {
        $request->validate([
            'dateStart' => 'required',
            'dateEnd' => 'required',
            'raison' => 'required',
        ]);


        $dateStartISO = Carbon::parse($request->dateStart)->format('Y-m-d');
        $dateEndISO = Carbon::parse($request->dateEnd)->format('Y-m-d');

        $dateStartFormatted = Carbon::parse($request->dateStart)->format('d/m/Y');
        $dateEndFormatted = Carbon::parse($request->dateEnd)->format('d/m/Y');

        $user = User::findOrFail($id);
        $user->save();

        $absence = new Absence();
        $absence->user_id = $user->id;
        $absence->date_debut = $dateStartISO;
        $absence->date_fin = $dateEndISO;
        $absence->raison = $request->raison;
        $absence->save();


        $userAntecedent = new User_Antecedent();
        $userAntecedent->user_id = $user->id;
        $userAntecedent->description = "Absence du " . $dateStartFormatted . " au " . $dateEndFormatted . " pour la raison suivante : " . $request->raison;
        $userAntecedent->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "absence";
        $historique->description = "Ajout d'une absence";
        $historique->save();

        return redirect()->route('absenceView')->with('success', 'Absence du ' . $dateStartFormatted . ' au ' . $dateEndFormatted . ' ajoutée avec succès');
    }

    public function absenceAdmin()
    {
        $absences = Absence::all();
        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();

        $BDD = base_de_donnees::all();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "absence";
        $historique->description = "Consultation des absences Admin";
        $historique->save();

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Absence/AbsenceAdmin', [
            'absences' => $absences,
            'users' => $users,
            'SpectreData' => $SpectreData,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }

    public function deleteAbsence($id)
    {
        $absence = Absence::findOrFail($id);
        $spectreData = SpectreData::where('user_id', $absence->user_id)->first();
        $absence->delete();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "absence";
        $historique->description = "Suppression de l'absence de SPECTRE-" . $spectreData->matricule;
        $historique->save();

        return redirect()->route('absenceAdmin')->with('success','Absence de SPECTRE-' . $spectreData->matricule . ' supprimée avec succès');
    }

    Public function BDDList()
    {
        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();
        $BDD = base_de_donnees::all();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Consultation de la base de données User";
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        return Inertia::render('BaseDeDonnée/BDDUserList', [
            'users' => $users,
            'SpectreData' => $SpectreData,
            'BDD' => $BDD,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ]);
    }

    Public function BDDView($id)
    {
        
        
        $data = base_de_donnees::where('id', $id)->first();
        $antecedents = bdd_antecedent::where('bdd_id', $id)->get();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Consultation User de la fiche de " . $data->nom . " " . $data->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());


        return Inertia::render('BaseDeDonnée/BDDUserView', [
            'data' => $data,
            'antecedents' => $antecedents,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ]);
    }
    
    Public function BDDUserCreate()
    {

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        return Inertia::render('BaseDeDonnée/BDDUserCreate',[
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ]);
    }

    Public function BDDUserStore(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'grade' => 'required|string',
            'matricule' => 'required|numeric',
            'branche' => 'required|string',
            'GI' => 'required|boolean',
            'groupe' => 'required|string',
            'steamid' => 'required|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $imagePath = null;
        if ($request->hasFile('photo')) {
            $imagePath = $request->file('photo')->store('photo_bdd', 'public');
        }
        
        $bdd = new base_de_donnees();
        $bdd->nom = $request->nom;
        $bdd->prenom = $request->prenom;
        $bdd->grade = $request->grade;
        $bdd->matricule = $request->matricule;
        $bdd->branche = $request->branche;
        $bdd->GI = $request->GI;
        $bdd->groupe = $request->groupe;
        $bdd->status = "N/A";
        $bdd->steam_id = $request->steamid;
        $bdd->lien_photo = $imagePath;
        $bdd->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Création User de la fiche de " . $request->nom . " " . $request->prenom;
        $historique->save();
        
        return redirect()->route('BDDList')->with('success', 'Fiche de ' . $request->nom . ' ' . $request->prenom . ' ajoutée avec succès');
    }

    Public function addBDDAntecedents(Request $request, $id)
    {
        $request->validate([
            'description' => 'required',
        ]);

        $description = $request->description;
        $bdd = base_de_donnees::findOrFail($id);
        $bdd->save();

        $bddAntecedent = new bdd_antecedent();
        $bddAntecedent->bdd_id = $id;
        $bddAntecedent->description = $description;
        $bddAntecedent->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Ajout d'un antécédent User pour " . $bdd->nom . " " . $bdd->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        return redirect()->route('BDDView', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Antécédent ajouté avec succès à ' . $bdd->nom . ' ' . $bdd->prenom);
    }

    Public function BDDAdminList()
    {
        $users = User::with('roles')->get();
        $SpectreData = SpectreData::all();
        $BDD = base_de_donnees::all();
        $absences = absence::all();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Consultation de la base de données Admin";
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('BaseDeDonnée/BDDAdminList', [
            'users' => $users,
            'SpectreData' => $SpectreData,
            'BDD' => $BDD,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }

    Public function BDDAdminView($id)
    {
        $data = base_de_donnees::where('id', $id)->first();
        $antecedents = bdd_antecedent::where('bdd_id', $id)->get();

        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();
        $users = User::with('roles')->get();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Consultation Admin de la fiche de " . $data->nom . " " . $data->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('BaseDeDonnée/BDDAdminView', [
            'data' => $data,
            'antecedents' => $antecedents,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }

    Public function addBDDAdminAntecedents(Request $request, $id)
    {
        $request->validate([
            'description' => 'required',
        ]);

        $description = $request->description;
        $bdd = base_de_donnees::findOrFail($id);
        $bdd->save();

        $bddAntecedent = new bdd_antecedent();
        $bddAntecedent->bdd_id = $id;
        $bddAntecedent->description = $description;
        $bddAntecedent->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Ajout d'un antécédent Admin pour " . $bdd->nom . " " . $bdd->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();

        return redirect()->route('BDDAdminView', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Antécédent ajouté avec succès à ' . $bdd->nom . ' ' . $bdd->prenom);
    }


    Public function AddAdminBDD()
    {

        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();
        $users = User::with('roles')->get();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        
        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('BaseDeDonnée/BDDAdminCreate',[
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
            
        ]);
    }

    public function AddAdminBDDStore(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'grade' => 'required|string',
            'matricule' => 'required|numeric',
            'branche' => 'required|string',
            'GI' => 'required|boolean',
            'groupe' => 'required|string',
            'steamid' => 'required|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $imagePath = null;
        if ($request->hasFile('photo')) {
            $imagePath = $request->file('photo')->store('photo_bdd', 'public');
        }
        
        $bdd = new base_de_donnees();
        $bdd->nom = $request->nom;
        $bdd->prenom = $request->prenom;
        $bdd->grade = $request->grade;
        $bdd->matricule = $request->matricule;
        $bdd->branche = $request->branche;
        $bdd->GI = $request->GI;
        $bdd->groupe = $request->groupe;
        $bdd->status = "N/A";
        $bdd->steam_id = $request->steamid;
        $bdd->lien_photo = $imagePath;
        $bdd->save();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Création Admin de la fiche de " . $request->nom . " " . $request->prenom;
        $historique->save();

        return redirect()->route('BDDAdminList')->with('success', 'Fiche de ' . $request->nom . ' ' . $request->prenom . ' ajoutée avec succès');
    }

    public function BDDAdminUpdate(Request $request, $id)
    {
        $request->validate([
            'data' => 'required',
        ]);

        $data = $request->data;

        if ($data['prenom'] || $data['nom'] || $data['grade'] || $data['matricule'] || $data['branche'] || $data['GI'] || $data['groupe'] || $data['status']) {
            $bdd = base_de_donnees::where('id', $id)->first();
            if ($data['prenom']) {
                $bdd->prenom = $data['prenom'];
            }
            if ($data['nom']) {
                $bdd->nom = $data['nom'];
            }
            if ($data['grade']) {
                $bdd->grade = $data['grade'];
            }
            if ($data['matricule']) {
                $bdd->matricule = $data['matricule'];
            }
            if ($data['branche']) {
                $bdd->branche = $data['branche'];
            }
            if ($data['GI']) {
                $bdd->GI = $data['GI'];
            }
            if ($data['groupe']) {
                $bdd->groupe = $data['groupe'];
            }
            if ($data['status']) {
                $bdd->status = $data['status'];
            }
            $bdd->save();
            
        }

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Modification de la fiche de " . $bdd->nom . " " . $bdd->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());

        return redirect()->route('BDDAdminView', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Fiche de ' . $bdd->nom . ' ' . $bdd->prenom . ' modifiée avec succès');
    }

    public function deleteBDDAdminAntecedents($id, $ant_id)
    {
        $bddAntecedent = bdd_antecedent::findOrFail($ant_id);
        $bddAntecedent->delete();

        $Data = base_de_donnees::where('id', $id)->first();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Suppression de l'antécédent de " . $Data->nom . " " . $Data->prenom;
        $historique->save();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());

        return redirect()->route('BDDAdminView', [
            'id' => $id,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
        ])->with('success', 'Antécédent de ' . $Data->nom . ' ' . $Data->prenom . ' supprimé avec succès');
    }

    public function deleteBDD($id)
    {
        $bdd = base_de_donnees::findOrFail($id);
        if ($bdd->lien_photo) {
            Storage::disk('public')->delete($bdd->lien_photo);
        }
        $bdd->delete();

        $historique = new historique();
        $historique->user_id = Auth::id();
        $historique->type = "BDD";
        $historique->description = "Suppression de la fiche de " . $bdd->nom . " " . $bdd->prenom;
        $historique->save();

        return redirect()->route('BDDAdminList')->with('success', 'Fiche de ' . $bdd->nom . ' ' . $bdd->prenom . ' supprimée avec succès');
    }

    public function historique()
    {
        
        $historiques = historique::all();
        $users = User::with('roles')->get();

        $SpectreData = SpectreData::all();
        $absences = absence::all();
        $BDD = base_de_donnees::all();

        $roles = Auth::user()->roles;
        $permissions = $roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        $user = User::findOrFail(Auth::id());

        foreach ($roles as $role) {

            $photoUser = PhotoUser::where('role_accept', $role->name)->first();

        }

        if ($photoUser) {
            $photoUser = $photoUser->lien;
        } else {
            $photoUser = PhotoUser::where('role_accept', '')->first()->lien;
        }

        $header = [
            'spectre' => $SpectreData,
            'absences' => $absences,
            'BDD' => $BDD,
            'users' => $users,
            'auth' => [
                'id' => Auth::id(),
                'roles' => $roles->pluck('name'),
                'permissions' => $permissions,
                'photo' => $photoUser,
            ],
        ];

        return Inertia::render('Historique/Historique', [
            'historiques' => $historiques,
            'users' => $users,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'roles' => $roles->pluck('name'),
                    'permissions' => $permissions,
                ],
            ],
            'header' => $header,
        ]);
    }
}
