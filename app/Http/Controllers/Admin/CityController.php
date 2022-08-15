<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCityRequest;
use App\Models\City;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::latest()->get();
        return Inertia::render('Admin/City/Index', ['cities' => $cities]);
    }

    public function create()
    {
        return Inertia::render('Admin/City/CreateCity');
    }

    public function store(StoreCityRequest $request)
    {
        City::create(
            $request->validated()
        );

        return Redirect::route('admin.cities.index')->with('success', 'City created successfully');
    }

    public function edit(City $city)
    {
        return Inertia::render('Admin/City/Edit', [
            'city' => [
                'id' => $city->id,
                'city' => $city->city,
                'address' => $city->address,
                'active' => $city->active,
            ]
        ]);
    }

    public function update(StoreCityRequest $request, City $city)
    {
        $city->update($request->validated());

        return Redirect::route('admin.cities.index')->with('success', 'City updated successfully');
    }

    public function destroy(City $city)
    {
        $city->delete();

        return Redirect::route('admin.cities.index')->with('success', 'City deleted successfully');
    }
}
