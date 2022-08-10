<?php

namespace App\Http\Controllers;

use App\DTO\Basket;
use App\DTO\BasketItem;
use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\Bike;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\Basket\BasketManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
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
        
        // $this->basketManager->changeQuantity(2, 1);

        // var_dump($this->basketManager->getBasket());
        // var_dump($this->basketManager->getBasket()->getTotalPrice());


        return Redirect::route('checkout')->with('success', 'Item added successfully');
    }

    public function getBasket()
    {
        $basket = $this->basketManager->getBasket();
        // dd($basket);

        return Inertia::render('Checkout',[
                'basket' => $basket,
            ]
        );
    }



    public function store(Request $request)
    {   
        
        $basket = $this->basketManager->getBasket();

        $user = $request->user();

        $orderNumberid = DB::table('order_sequence')->insertGetId(['id' => null]);
        DB::table('order_sequence')->where('id', '<', $orderNumberid)->delete();


        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $basket->getTotalPrice(),
        ]);

        $order->order_nr = '#' . str_pad($orderNumberid, 4, "0", STR_PAD_LEFT);
        $order->save();

        foreach ($basket->getItems() as $item) {
            OrderItem::create([
                'bike_id' => $item->getProductId(),
                'order_id' => $order->id,
                'quantity' => $item->getQuantity(), // pravaliduoti pries visus save quantity ar turim in_stock
                'unit_price' => $item->getUnitPrice(),
            ]);
        }

        //pabaigoje sumazinti in_stock kieki.

        $this->basketManager->clear();

        return Redirect::route('dashboard')->with('success', 'User created successfully');
    }
}