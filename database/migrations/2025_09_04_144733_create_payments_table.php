<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('payment_id')->primary();
            $table->uuid('user_id'); // payments tied to users with role=student
            $table->string('payment_method');
            $table->string('transaction_id')->unique();
            $table->dateTime('receipt_date');
            $table->integer('payment_amount');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('user_id') 
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
