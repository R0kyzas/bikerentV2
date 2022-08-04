<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBikeRequest;
use App\Models\Bike;
use App\Models\Category;
use App\Models\City;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BikeController extends Controller
{
    public function index()
    {
        $bikes = Bike::with('category', 'city')->get();
        
        return Inertia::render('Admin/Bike/Index', [
            'bikes' => $bikes,
        ]);
    }

    public function create()
    {
        $categories = Category::get();
        $cities = City::get();
        return Inertia::render('Admin/Bike/CreateBike', [
            'categories' => $categories,
            'cities' => $cities,
        ]);
    }

    public function store(StoreBikeRequest $request)
    {
        Bike::create([
            $request->validated(),
            'title' => $request->title,
            'description' => $request->description,
            'idn' => $request->idn,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'city_id' => $request->city_id,
            'active' => $request->active,
        ]);
        

        return Redirect::route('admin.bikes.index')->with('success', 'Bike created successfully');
    }

    public function edit(Bike $bike)
    {
        $categories = Category::get();
        $cities = City::get();
        
        return Inertia::render('Admin/Bike/Edit', [
            'bike' => [
                'id' => $bike->id,
                'title' => $bike->title,
                'idn' => $bike->idn,
                'description' => $bike->description,
                'price' => $bike->price,
                'category_id' => $bike->category->id,
                'category_title' => $bike->category->title,
                'city_id' => $bike->city->id,
                'city' => $bike->city->city,
                'address' => $bike->city->address,
                'active' => $bike->active,
            ],
            'categories' => $categories,
            'cities' => $cities,
        ]);
    }

    public function update(StoreBikeRequest $request, Bike $bike)
    {
        $bike->update($request->validated());

        return Redirect::route('admin.bikes.index')->with('success', 'Bike updated successfully');
    }

    public function destroy(Bike $bike)
    {
        $bike->delete();

        return Redirect::route('admin.bikes.index')->with('success', 'Bike deleted successfully');
    }

}
