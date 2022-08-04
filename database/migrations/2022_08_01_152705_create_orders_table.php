<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bike_id')->references('id')->on('bikes');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->float('total_price',8,2)->default(0);
            $table->integer('rent_days');
            $table->integer('quantity');
            $table->string('status', 15)->default('Pending');
            $table->string('cancel_reason', 255)->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
