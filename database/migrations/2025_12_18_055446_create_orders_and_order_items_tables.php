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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Buyer
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade'); // Supplier fulfilling the order
            $table->decimal('total_amount', 12, 2);
            $table->enum('status', ['pending', 'confirmed', 'shipping', 'delivered'])
                  ->default('pending');
            $table->string('delivery_name')->nullable();
            $table->string('delivery_phone')->nullable();
            $table->text('delivery_address')->nullable();
            $table->timestamps();
        });

        // Create order_items table after orders (depends on order_id)
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price_at_purchase', 10, 2); // Snapshot of price when ordered
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
