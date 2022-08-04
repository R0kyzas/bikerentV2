<?php

namespace App\Services;

use App\Models\Order;

/**
 * Class NextOrderStepResolver
 * @package App\Services
 */
class NextOrderStepResolver
{
    public const MAP = [
        Order::STATUS_PENDING => 1,
        Order::STATUS_ACCEPTED => 2,
        Order::STATUS_COMPLETED => 3,
        Order::STATUS_CANCELED => 4,
    ];

    public function resolve($order)
    {
        return self::MAP[$order->status] ? self::MAP[$order->status] : 0;
    }
}
