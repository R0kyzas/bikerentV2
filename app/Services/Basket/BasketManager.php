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

    private function howMuchAdd($quantity,  Bike $bike){
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

        if($bike->in_stock < $this->howMuchAdd($quantity, $bike)){ 
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
                $quantity,
            );

            $basket->addItem($basketItem);
        }

        $this->basketSessionStorage->store($basket);
        $this->recalculate();
    }

    public function removeItem(int $productId): void
    {
        $basket = $this->getBasket();

        if ($basket->hasItem($productId)) {
            $basket->removeItem($productId);
            $this->recalculate();
            $this->basketSessionStorage->store($basket);
        }
    }

    public function changeQuantity(int $productId, int $quantity): void
    {
        $basket = $this->getBasket();

        if ($basket->hasItem($productId)) {
            $basketItem = $basket->getItem($productId);
            $basketItem->setQuantity($quantity);
            $this->recalculate();
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


        $basket->setTotalPrice($total);
        $this->basketSessionStorage->store($basket);
    }

    public function getBasket(): Basket
    {
        $basket = $this->basketSessionStorage->get();

        return $basket ?: new Basket();
    }

    public function clear(): void
    {
        $this->basketSessionStorage->clear();
    }
}