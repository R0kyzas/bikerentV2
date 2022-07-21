<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();

        return Inertia::render('Admin/User/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Admin/User/CreateUser');
    }

    public function store(StoreUserRequest $request)
    {
        User::create(
            $request->validated()
        );

        return Redirect::route('user.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/User/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    public function update(StoreUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return Redirect::route('users.index')->with('success', 'User created successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::route('users.index')->with('success', 'User deleted successfully');
    }
}
