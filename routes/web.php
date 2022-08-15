<?php

use App\Http\Controllers\Admin\BikeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\User\HomeController as UserHomeController;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth', 'verified', 'role:user'], function(){
    Route::get('/dashboard', [UserHomeController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/review/{id}', [UserHomeController::class, 'showReview'])->name('show.review');
    Route::post('/dashboard/review/{id}', [UserHomeController::class, 'store'])->name('user.review.store');
});

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
});

require __DIR__.'/auth.php';
