<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SpectreData;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Support\Providers\RouteServieProvider;
use App\Models\historique;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string|confirmed|min:8',
            'matricule' => 'required|numeric',
            'grade' => 'required|string',
            'specialisation' => 'required|string',
            'loyaute' => 'required|numeric',
            'STEAM_ID' => 'required|string',
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        $spectreData = SpectreData::create([
            'user_id' => $user->id,
            'STEAM_ID' => $request->STEAM_ID,
            'matricule' => $request->matricule,
            'loyauté' => $request->loyaute,
            'vie' => 3,
        ]);

        $user->syncRoles([$request->grade, $request->specialisation]);
    
        $historique = new historique();
        $historique->user_id = Auth::user()->id;
        $historique->type = 'register';
        $historique->description = 'Création du compte de SPECTRE-' . $request->matricule;
        $historique->save();

        event(new Registered($user, $spectreData));

        session()->flash('success', 'SPECTRE-' . $request->matricule . ' a bien été créé.');

        return redirect()->intended(route('usersList', absolute: false));
    }
}
