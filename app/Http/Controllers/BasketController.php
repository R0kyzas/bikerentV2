<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\Basket\BasketManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BasketController extends Controller
{
    private BasketManager $basketManager;

    public function __construct(BasketManager $basketManager)
    {
        $this->basketManager = $basketManager;
    }

    public function addItem(Request $request)
    {
        try {
            $bike = Bike::find($request->product);
            $quantity = $request->quantity;
            $this->basketManager->addItem($bike, $quantity);
        } catch (\Exception $e) {
            return Redirect::route('rent', ['id' => $bike->id])->with('error', $e->getMessage());
        }

        return Redirect::route('checkout')->with('success', 'Item added successfully');
    }

    public function getBasket()
    {
        $basket = $this->basketManager->getBasket();

        return Inertia::render('Checkout',[
                'basket' => $basket,
            ]
        );
    }

    public function removeItem($id)
    {
        $basket = $this->basketManager->getBasket();

        if($basket)
        {
            $this->basketManager->removeItem($id);
            return Redirect::route('checkout')->with('success', 'Item deleted successfully');
        }
        return Redirect::route('checkout')->with('error', 'Item deleted unsuccessfully');
    }

    public function store(Request $request)
    {   
        $basket = $this->basketManager->getBasket();

        if($basket)
        {
            foreach ($basket->getItems() as $item) {
                $user = $request->user();
        
                $orderNumberid = DB::table('order_sequence')->insertGetId(['id' => null]);
                DB::table('order_sequence')->where('id', '<', $orderNumberid)->delete();
        
                $bike = Bike::find($item->getProductId());
                
                if($bike->in_stock >= $item->getQuantity())
                {
                    $order = Order::create([
                        'user_id' => $user->id,
                        'total_price' => $basket->getTotalPrice(),
                    ]);
        
                    $order->order_nr = '#' . str_pad($orderNumberid, 4, "0", STR_PAD_LEFT);
                    
                    OrderItem::create([
                        'bike_id' => $item->getProductId(),
                        'order_id' => $order->id,
                        'quantity' => $item->getQuantity(),
                        'unit_price' => $item->getUnitPrice(),
                    ]);
        
                    $bike->update(['in_stock' => $bike->in_stock - $item->getQuantity()]);
        
                    $order->save();
        
                    $this->basketManager->clear();
                    
                    return Redirect::route('dashboard')->with('success', 'Order successfully confirmed.');
                }else{
                    $this->basketManager->clear();
        
                    return Redirect::route('dashboard')->with('error', 'Order cannot be confirmed, because not enough quantity. Try again later.');
                }
            } 
        }
        return Redirect::route('dashboard')->with('error', 'Order cannot be confirmed, because no items in basket.');
    }
}