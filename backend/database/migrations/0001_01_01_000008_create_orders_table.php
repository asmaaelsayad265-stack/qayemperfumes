<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->string('order_number')->unique();
      $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
      $table->decimal('total', 12, 2);
      $table->enum('status', ['new', 'preparing', 'shipped', 'completed', 'canceled'])->default('new');
      $table->enum('payment_status', ['paid', 'pending', 'failed'])->default('pending');
      $table->string('payment_method')->nullable();
      $table->string('shipping_address')->nullable();
      $table->string('customer_email')->nullable();
      $table->string('customer_phone')->nullable();
      $table->text('notes')->nullable();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
