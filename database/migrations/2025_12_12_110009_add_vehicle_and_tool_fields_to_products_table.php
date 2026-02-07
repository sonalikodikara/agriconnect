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
        Schema::table('products', function (Blueprint $table) {
            // Vehicle Fields
            $table->string('vehicle_type')->nullable(); // tractor, mini_truck, etc.
            $table->string('brand_model')->nullable();  // e.g., Mahindra 575, TAFE
            $table->integer('year')->nullable();
            $table->string('engine_power_hp')->nullable(); // e.g., 35 HP
            $table->string('condition')->nullable(); // New, Used, Refurbished
            $table->boolean('for_rent')->default(false);
            $table->decimal('rental_price_per_day', 10, 2)->nullable();
            $table->text('vehicle_features')->nullable();

            // Tool Fields
            $table->string('tool_type')->nullable(); // manual, battery, tractor_mounted
            $table->string('tool_name')->nullable(); // Nagula, Kewita, Giraya, Rotavator, etc.
            $table->string('power_source')->nullable(); // Manual, Battery, Petrol, Diesel
            $table->string('working_width')->nullable(); // e.g., 120cm
            $table->boolean('is_modern')->default(false); // traditional vs modern
            $table->text('tool_features')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'vehicle_type', 'brand_model', 'year', 'engine_power_hp',
                'condition', 'for_rent', 'rental_price_per_day', 'vehicle_features',
                'tool_type', 'tool_name', 'power_source', 'working_width',
                'is_modern', 'tool_features'
            ]);
        });
    }
};
