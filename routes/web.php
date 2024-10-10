<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Spectre_Data;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// Profile


Route::middleware('auth')->group(function () {

    Route::get('/', [Spectre_Data::class, 'index'])->name('index');

    Route::get('/absence', [Spectre_Data::class, 'absenceView'])->name('absenceView');
    Route::post('/absence/{id}', [Spectre_Data::class, 'absenceStore'])->name('absenceStore');
    Route::get('/BDD', [Spectre_Data::class, 'BDDList'])->name('BDDList');
    Route::get('/BDD/edit/{id}', [Spectre_Data::class, 'BDDView'])->name('BDDView');
});

Route::middleware('auth', 'can:dashboard')->group(function () {

    Route::get('/dashboard', [Spectre_Data::class, 'dashboard'])->name('dashboard');

    Route::middleware('auth', 'can:viewAbsence')->group(function () {
        Route::get('/dashboard/absence', [Spectre_Data::class, 'absenceAdmin'])->name('absenceAdmin');
    });

    Route::middleware('auth', 'can:viewAbsence')->group(function () {
        Route::delete('/dashboard/absence/{id}', [Spectre_Data::class, 'deleteAbsence'])->name('deleteAbsence');
    });

    Route::middleware('auth', 'can:viewUser')->group(function () {
        Route::get('/dashboard/usersList', [Spectre_Data::class, 'userlist'])->name('usersList');
    });

    Route::middleware('auth', 'can:loyaute')->group(function () {
        Route::get('/dashboard/loyaute', [Spectre_Data::class, 'loyauteView'])->name('loyaute');
    });
    
    Route::middleware('auth', 'can:createUser')->group(function () {
        Route::get('/dashboard/usersCreate', [Spectre_Data::class, 'usercreate'])->name('userscreate');
    });
    
    Route::middleware('auth', 'can:viewUser')->group(function () {
        Route::get('/dashboard/userEdit/{id}', [Spectre_Data::class, 'useredit'])->name('editUser');
    });
    
    
    // User Edit
    Route::middleware('auth', 'can:editUser')->group(function () {
        Route::put('/dashboard/userEdit/{id}/update', [Spectre_Data::class, 'userupdate'])->name('updateUser');
    });
    
    Route::middleware('auth', 'can:editMedailles')->group(function () {
        Route::post('/dashboard/userEdit/{id}/updateMedal', [Spectre_Data::class, 'updateUserMedal'])->name('updateUserMedal');
    });

    Route::middleware('auth', 'can:editLife')->group(function () {
        Route::post('/dashboard/userEdit/{id}/updateLife', [Spectre_Data::class, 'updateUserLife'])->name('updateUserLife');
    });
    
    Route::middleware('auth', 'can:editAntecedentsUser')->group(function () {
        Route::post('/dashboard/userEdit/{id}/updateAnt', [Spectre_Data::class, 'addUserAntecedents'])->name('addUserAntecedents');
        Route::delete('/dashboard/userEdit/{id}/deleteAnt/{ant_id}', [Spectre_Data::class, 'deleteUserAntecedents'])->name('deleteUserAntecedents');
    });
    // User Edit
    
    Route::middleware('auth', 'can:createUser')->group(function () {
        Route::delete('/dashboard/user/{id}', [Spectre_Data::class, 'deleteUser'])->name('deleteUser');
    });
    
    // Loyauté
    Route::middleware('auth', 'can:loyaute')->group(function () {
        Route::post('/dashboard/loyaute/{id}/update', [Spectre_Data::class, 'updateLoyaute'])->name('updateLoyaute');
    });
    // Loyauté

    //BDD

    Route::middleware('auth', 'can:viewBDD')->group(function () {
        Route::get('/dashboard/BDD/List', [Spectre_Data::class, 'BDDAdminList'])->name('BDDAdminList');
    });

    Route::middleware('auth', 'can:editBDD')->group(function () {
        Route::get('/dashboard/BDD/edit/{id}', [Spectre_Data::class, 'BDDAdminView'])->name('BDDAdminView');
        Route::put('/dashboard/BDD/edit/{id}/update', [Spectre_Data::class, 'BDDAdminUpdate'])->name('BDDAdminUpdate');
    });

    Route::middleware('auth', 'can:editAntecedentsBDD')->group(function () {
        Route::post('/dashboard/BDD/edit/{id}/updateAnt', [Spectre_Data::class, 'addBDDAdminAntecedents'])->name('addBDDAdminAntecedents');
        Route::delete('/dashboard/BDD/edit/{id}/deleteAnt/{ant_id}', [Spectre_Data::class, 'deleteBDDAdminAntecedents'])->name('deleteBDDAdminAntecedents');
    });

    Route::middleware('auth', 'can:addBDD', 'can:viewBDD')->group(function () {
        Route::get('/dashboard/BDD/create', [Spectre_Data::class, 'AddAdminBDD'])->name('AddAdminBDD');
        Route::post('/dashboard/BDD/create/store', [Spectre_Data::class, 'AddAdminBDDStore'])->name('AddAdminBDDStore');
    });

    Route::middleware('auth', 'can:viewAll')->group(function () {
        Route::delete('/dashboard/BDD/{id}/delete', [Spectre_Data::class, 'deleteBDD'])->name('deleteBDD');
    });

    Route::middleware('auth', 'can:viewAll')->group(function () {
        Route::get('/dashboard/historique', [Spectre_Data::class, 'historique'])->name('historique');
    });

});


//BDD
Route::middleware('auth', 'can:addBDD')->group(function () {
    Route::get('/BDD/Create', [Spectre_Data::class, 'BDDUserCreate'])->name('BDDUserCreate');
    Route::post('/BDD/Create/store', [Spectre_Data::class, 'BDDUserStore'])->name('BDDUserStore');
});

Route::middleware('auth', 'can:editAntecedentsBDD')->group(function () {
    Route::post('/BDD/edit/{id}/updateAnt', [Spectre_Data::class, 'addBDDAntecedents'])->name('addBDDAntecedents');
});
//BDD




require __DIR__.'/auth.php';
