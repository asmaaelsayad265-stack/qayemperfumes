<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('name_ar');
      $table->string('name_en')->nullable();
      $table->string('slug')->unique();
      $table->text('description_ar')->nullable();
      $table->text('description_en')->nullable();
      $table->decimal('price', 10, 2);
      $table->decimal('original_price', 10, 2)->nullable();
      $table->foreignId('category_id')->constrained()->cascadeOnDelete();
      $table->enum('status', ['active', 'draft', 'archived'])->default('draft');
      $table->enum('season', ['all', 'summer', 'winter', 'spring', 'autumn'])->default('all');
      $table->enum('gender', ['unisex', 'men', 'women'])->default('unisex');
      $table->boolean('is_featured')->default(false);
      $table->boolean('is_best_seller')->default(false);
      $table->boolean('is_limited_edition')->default(false);
      $table->string('image')->nullable();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
