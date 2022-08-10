<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderCancelReasonRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {

        // $query = Order::query();
        // if(request('search')){
        //     return $query->where('status', 'LIKE', '%'.request('search').'%');
        // }
            $search = $request->query('search');
        // $orders = Order::when($request->search, function($query, $search){
        //     $query->where('status', 'LIKE', '%'.$search.'%');
        // })->with('user', 'bike')->orderByRaw("FIELD(status, 'Accepted', 'Pending', 'Completed', 'Canceled')")->get();
        // $orders = Order::with('user', 'bike')->orderByRaw("FIELD(status, 'Accepted', 'Pending', 'Completed', 'Canceled')")->get();

        return Inertia::render('Admin/Order/Index', [
            'orders' => Order::query()->when($search, fn($query) =>
                $query->where('id', 'LIKE', "%{$search}%"))
                // ->where('status', 'Like', "smt"))
                ->with('user', 'bike')
                ->orderByRaw("FIELD(status, 'Accepted', 'Pending', 'Completed', 'Canceled')")
                ->get(),
        ]);
    }

    public function confirm(Order $order){
        if($order->status === Order::STATUS_PENDING)
        {
            $order->status = Order::STATUS_ACCEPTED;
            $order->save();

            return Redirect::route('admin.orders.index')->with('success', 'Order status changed successfully');
        }

        return Redirect::route('admin.orders.index')->with('error', 'Order status changed unsuccessfully');
    }

    public function complete(Order $order){
        if($order->status === Order::STATUS_ACCEPTED)
        {
            $order->status = Order::STATUS_COMPLETED;
            $order->save();

            return Redirect::route('admin.orders.index')->with('success', 'Order status changed successfully');
        }

        return Redirect::route('admin.orders.index')->with('error', 'Order status changed unsuccessfully');
    }

    public function cancel(StoreOrderCancelReasonRequest $request, Order $order){
        if($order->status = Order::STATUS_PENDING)
        {
            $validated = $request->validated();
            if($validated){
                $order->status = Order::STATUS_CANCELED;   
                $order->save();
                $order->update($validated);

                return Redirect::route('admin.orders.index')->with('success', 'Order status changed successfully');
            }
        }
        return Redirect::route('admin.orders.index')->with('error', 'Order status changed unsuccessfully');
    }

    // public function filterById(Request $request, $id)
    // {
    //     $id = $request->get('search');

    //     Order::where('id','=',$id)->get();
    
    //     dd($id);
    // }
}
