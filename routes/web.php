<?php

use App\Http\Controllers\Admin\BikeController;
use App\Http\Controllers\Admin\UserController;
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

Route::group(['middleware' => ['auth']], function(){
    Route::get('/');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified','role:user'])->name('dashboard');


// Route::get('/admin', function (){
//     Route::resource('/bikes', BikeController::class);
// })->middleware(['verified', 'role:admin']);

Route::middleware(['auth','verified', 'role:admin'])->group(function(){
    Route::resource('/admin/bikes', BikeController::class);
});

Route::resource('/admin/users', UserController::class);

// Route::prefix('/admin')->group(function(){

//     // Route::resource('admin/bikes', [BikeController::class, 'list']);

//     Route::prefix('/bikes')->group(function(){
//         Route::resource('/', [BikeController::class, 'list']);
//     });

// });

// Route::get('/admin/bikes', function () {
// })->middleware(['auth', 'verified'])->name('admin.dashboard');

require __DIR__.'/auth.php';
