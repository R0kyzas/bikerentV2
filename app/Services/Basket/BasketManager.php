<?php

namespace App\Services\Basket;

use App\DTO\Basket;
use App\DTO\BasketItem;
use App\Models\Bike;

class BasketManager 
{
    private BasketSessionStorage $basketSessionStorage;

    public function __construct(BasketSessionStorage $basketSessionStorage)
    {
        $this->basketSessionStorage = $basketSessionStorage;
    }

    private function kiekKuriPridesim($quantity,  Bike $bike){
        $basket = $this->getBasket();

        if($basket->hasItem($bike->id))
        {
            $item = $basket->getItem($bike->id);
            $item->getQuantity();
    
            $value = $quantity + $item->getQuantity();
    
            return $value;
        }else{
            return $quantity;
        }
    }

    public function addItem(Bike $bike, int $quantity = 1): void
    {
        $basket = $this->getBasket();
        //dabartinis quantity && quantity kurį norėsim įdėti
        //$basket->getItem($bike->id) === 
        if($bike->in_stock < $this->kiekKuriPridesim($quantity, $bike)){ 
            throw new \Exception('Nepakanka kiekio');
        }
        if ($basket->hasItem($bike->id)) {
            $basketItem = $basket->getItem($bike->id);
            $basketItem->setQuantity($basketItem->getQuantity() + $quantity);
        } else {
            $basketItem = new BasketItem(
                $bike->id,
                $bike->title,
                $bike->idn,
                $bike->price,
                $quantity // cia is inputo value
            );

            $basket->addItem($basketItem);
        }

        
        //Jeigu būčiau sylius saugočiau į DB
        $this->basketSessionStorage->store($basket);
        $this->recalculate();
//        Session::put('basket', $basket);

    }

    public function removeItem(int $productId): void
    {
        $basket = $this->getBasket();

        if ($basket->hasItem($productId)) {
            $basket->removeItem($productId);
            $this->recalculate();
//            Session::put('basket', $basket);
            $this->basketSessionStorage->store($basket);
        }
//        else {
//            throw new \InvalidArgumentException('Invalid product id Provided');
//        }
        // else jei norim galim mesti exception
    }

    public function changeQuantity(int $productId, int $quantity): void
    {
        $basket = $this->getBasket();

        if ($basket->hasItem($productId)) {
            $basketItem = $basket->getItem($productId);
            $basketItem->setQuantity($quantity);
            $this->recalculate();
//            Session::put('basket', $basket);
            $this->basketSessionStorage->store($basket);
        }
    }

    public function recalculate(): void
    {
        $basket = $this->getBasket();
        $total = 0;

        foreach ($basket->getItems() as $item) {
            $total += $item->getQuantity() * $item->getUnitPrice();
        }

        //apply discount

        $basket->setTotalPrice($total);
        $this->basketSessionStorage->store($basket);
    }

    public function getBasket(): Basket
    {
        //Jeigu būčiau sylius traukčiau iš DB
        $basket = $this->basketSessionStorage->get();
//        Session::get('basket');

        return $basket ?: new Basket();
    }

    public function clear(): void
    {
        //jeigu būčiau sylius trinčiau record iš db
        //Session::remove('basket');
        $this->basketSessionStorage->clear();
    }
}