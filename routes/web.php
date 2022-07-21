<?php

use App\Http\Controllers\Admin\BikeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => 'auth', 'verified'], function() {

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"])->name('authRender');

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified', 'role:admin'])->group(function(){
    Route::resource('/admin/bikes', BikeController::class);
    Route::resource('/admin/users', UserController::class);
});



// Route::prefix('/admin')->group(function(){

//     // Route::resource('admin/bikes', [BikeController::class, 'list']);

//     Route::prefix('/bikes')->group(function(){
//         Route::resource('/', [BikeController::class, 'list']);
//     });

// });

require __DIR__.'/auth.php';
