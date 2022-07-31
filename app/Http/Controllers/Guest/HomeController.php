<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
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
}
