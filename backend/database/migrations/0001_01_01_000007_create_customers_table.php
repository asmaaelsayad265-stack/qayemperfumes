<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('customers', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email')->unique()->nullable();
      $table->string('phone')->nullable();
      $table->integer('orders_count')->default(0);
      $table->decimal('total_spent', 12, 2)->default(0);
      $table->boolean('is_vip')->default(false);
      $table->timestamp('last_order_at')->nullable();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('customers');
  }
};
