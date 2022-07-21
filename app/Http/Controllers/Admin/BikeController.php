<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBikeRequest;
use App\Models\Bike;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BikeController extends Controller
{
    public function index()
    {
        $bikes = Bike::latest()->get();

        return Inertia::render('Admin/Bike/Index', ['bikes' => $bikes]);
    }

    public function create()
    {
        return Inertia::render('Admin/Bike/CreateBike');
    }

    public function store(StoreBikeRequest $request)
    {
        Bike::create(
            $request->validated()
        );

        return Redirect::route('bikes.index')->with('success', 'Bike created successfully');
    }

    public function edit(Bike $bike)
    {
        return Inertia::render('Admin/Bike/Edit', [
            'bike' => [
                'id' => $bike->id,
                'title' => $bike->title,
                'idn' => $bike->idn,
                'address' => $bike->address,
                'city' => $bike->city,
            ]
        ]);
    }

    public function update(StoreBikeRequest $request, Bike $bike)
    {
        $bike->update($request->validated());

        return Redirect::route('bikes.index')->with('success', 'Bike created successfully');
    }

    public function destroy(Bike $bike)
    {
        $bike->delete();

        return Redirect::route('bikes.index')->with('success', 'Bike deleted successfully');
    }
}
