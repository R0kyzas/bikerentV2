<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    { 
        $orders = Order::with('user', 'order_items', 'order_items.bike', 'order_items.bike.city', 'order_items.bike.category', 'order_items.bike.ratings')->get();

        return Inertia::render('Dashboard', [
            'orders' => $orders,
        ]);
    }

    public function showReview($id)
    {
        $order = Order::with('order_items')->find($id);
        return Inertia::render('UserRatingDashboard', [
            'order' => $order,
        ]);
    }

    public function store(Request $request)
    {
        if($request->review_status === 0)
        {
            Rating::create([
                'user_id' => $request->user_id,
                'bike_id' => $request->bike_id,
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);

            $setReviewStatus = $request->review_status = 1;
            
            Order::where('id', $request->id)->update(['review_status' => $setReviewStatus]);
            return Redirect::route('dashboard')->with('success', 'Thank you for review');
        }

        return Redirect::route('dashboard')->with('error', 'Review already exist');
    }
}
