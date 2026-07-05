<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('reviews', function (Blueprint $table) {
      $table->id();
      $table->foreignId('product_id')->constrained()->cascadeOnDelete();
      $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
      $table->string('customer_name');
      $table->string('customer_email')->nullable();
      $table->tinyInteger('rating')->unsigned();
      $table->text('body')->nullable();
      $table->boolean('is_approved')->default(false);
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('reviews');
  }
};
