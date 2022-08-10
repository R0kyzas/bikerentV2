<?php

use App\Http\Controllers\Admin\BikeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\Guest\HomeController;
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
})->middleware(['auth', 'verified', 'role:user'])->name('dashboard');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('rent/{id}', [HomeController::class, 'showRent'])->name('rent');

Route::middleware(['auth','verified', 'role:admin'])->group(function(){
    
    Route::prefix('admin')->group(function () {
        
        Route::name('admin.')->group(function (){
            
            Route::resource('bikes', BikeController::class);
            Route::resource('users', UserController::class);
            Route::resource('categories', CategoryController::class);
            Route::resource('cities', CityController::class);
            Route::resource('orders', OrderController::class);

            Route::prefix('orders')->group(function () {
            Route::match(['get','post'], 'confirm/{order}', [OrderController::class, 'confirm'])->name('orders.confirm');
            Route::match(['get','post'], 'cancel/{order}', [OrderController::class, 'cancel'])->name('orders.cancel');
            Route::match(['get','post'], 'complete/{order}', [OrderController::class, 'complete'])->name('orders.complete');
            Route::match(['get','post'], '/?search={id}', [OrderController::class, 'filterById'])->name('orders.filterById');
            
            });
        });
    });
    // Route::resource('/admin/bikes', BikeController::class);
    // Route::resource('/admin/users', UserController::class);
    // Route::resource('/admin/categories', CategoryController::class);
    // Route::resource('/admin/cities', CityController::class);
    // Route::resource('/admin/orders', OrderController::class);
    // Route::match(['get','post'], 'admin/orders/confirm/{order}', [OrderController::class, 'confirm'])->name('admin.orders.confirm');
    // Route::match(['get','post'], 'admin/orders/cancel/{order}', [OrderController::class, 'cancel'])->name('admin.orders.cancel');
    // Route::match(['get','post'], 'admin/orders/complete/{order}', [OrderController::class, 'complete'])->name('admin.orders.complete');
});



// Route::prefix('/admin')->group(function(){

//     // Route::resource('admin/bikes', [BikeController::class, 'list']);

//     Route::prefix('/bikes')->group(function(){
//         Route::resource('/', [BikeController::class, 'list']);
//     });

// });

require __DIR__.'/auth.php';
