<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home(Request $request)
    {
        
        if($request->user()->hasRole('admin')){
            return redirect('/admin/orders');
        }
        elseif($request->user()->hasRole('user')){
            return redirect('/dashboard');
        }

        return abort(404);
    }
}
