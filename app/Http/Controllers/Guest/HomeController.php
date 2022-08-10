<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if($request->user() && $request->user()->hasRole('admin')){
            return redirect('/admin/orders');
        }
        $bikes = DB::select('select * from bikes where active = :active order by id desc', [
            'active' => 1,
        ]);
        $categories = DB::select('select * from categories where active = :active order by id desc', [
            'active' => 1,
        ]);
        $cities = DB::select('select * from cities where active = :active order by id desc', [
            'active' => 1,
        ]);
        return Inertia::render('GuestDashboard', [
                'bikes' => $bikes,
                'categories' => $categories,
                'cities' => $cities,
            ]
        );
    }

    public function showRent(Request $request, $id)
    {
        if($request->user() && $request->user()->hasRole('admin')){
            return redirect('/admin/orders');
        }

        $bike = Bike::find($id);
        return Inertia::render('GuestRentIndex',[
            'bike' => [
                'id' => $bike->id,
                'title' => $bike->title,
                'price' => $bike->price,
                'description' => $bike->description,
                'category_title' => $bike->category->title,
                'city' => $bike->city->city,
                'address' => $bike->city->address,
                'in_stock' => $bike->in_stock,
            ]
        ]);
    }
}
