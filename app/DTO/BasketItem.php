<?php

namespace App\DTO;

class BasketItem implements \JsonSerializable
{
//    private $basketId;

    private int $productId;

    private string $title;

    private string $idn;

    private int $unitPrice;

    private int $quantity;
    

    public function __construct(
        int $productId,
        string $title,
        string $idn,
        int $unitPrice,
        int $quantity,
    ) {
        $this->productId = $productId;
        $this->title = $title;
        $this->idn = $idn;
        $this->unitPrice = $unitPrice;
        $this->quantity = $quantity;
    }

    public function getProductId(): int
    {
        return $this->productId;
    }
    

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getIdn(): string
    {
        return $this->idn;
    }

    public function getUnitPrice(): int
    {
        return $this->unitPrice;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function jsonSerialize():array 
     {
        return [
            'id' => $this->productId,
            'title' => $this->title,
            'idn' => $this->idn,
            'unitPrice' => $this->unitPrice,
            'quantity' => $this->quantity,
        ];
    }
}