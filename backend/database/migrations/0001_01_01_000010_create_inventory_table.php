<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('inventory', function (Blueprint $table) {
      $table->id();
      $table->foreignId('product_id')->constrained()->cascadeOnDelete();
      $table->string('sku')->unique();
      $table->string('variant')->default('default');
      $table->integer('quantity')->default(0);
      $table->integer('reserved')->default(0);
      $table->integer('low_stock_threshold')->default(5);
      $table->string('location')->nullable();
      $table->enum('status', ['in_stock', 'out_of_stock', 'low_stock'])->default('in_stock');
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('inventory');
  }
};
