<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if($request->user() && $request->user()->hasRole('admin')){
            return redirect('/admin/orders');
        }


        $bikes = Bike::with('ratings')->get();

        return Inertia::render('GuestDashboard', [
                'bikes' => $bikes,
            ]
        );
    }

    public function showRent(Request $request, $id)
    {
        if($request->user() && $request->user()->hasRole('admin')){
            return redirect('/admin/orders');
        }

        $bike = Bike::with('ratings')->find($id);
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
                'ratings' => $bike->ratings,
            ]
        ]);
    }
}
