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
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['supplier_id']); // Drops the foreign key constraint
            $table->dropColumn('supplier_id');    // Now drops the column
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
        });
    }
};
