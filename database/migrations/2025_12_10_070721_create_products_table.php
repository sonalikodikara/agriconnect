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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('category');
            $table->string('quality')->nullable();

            $table->decimal('price', 10, 2);
            $table->decimal('quantity', 10, 2)->nullable();
            $table->string('quantity_unit')->default('kg');

            $table->text('description')->nullable();
            $table->unsignedInteger('minimum_order')->default(1);
            $table->string('packaging_size')->nullable();

            // Composition
            $table->json('npk')->nullable();
            $table->json('other_nutrition')->nullable();
            $table->json('ingredients')->nullable();
            $table->json('micronutrients')->nullable();

            // Advanced
            $table->text('manufacturing_details')->nullable();
            $table->text('soil_type')->nullable();
            $table->text('instructions')->nullable();
            $table->text('safety_storage')->nullable();

            // Media
            $table->string('primary_image')->nullable();
            $table->json('optional_images')->nullable();
            $table->json('certificates')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
