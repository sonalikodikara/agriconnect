<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For MySQL/MariaDB, we need to modify the ENUM column
        // First, update existing values to match new status names
        DB::table('orders')
            ->where('status', 'confirmed')
            ->update(['status' => 'accepted']);

        DB::table('orders')
            ->where('status', 'shipping')
            ->update(['status' => 'dispatched']);

        // Change ENUM to VARCHAR to allow new status values
        // MySQL doesn't support direct ENUM modification, so we convert to VARCHAR
        DB::statement("ALTER TABLE orders MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending'");

        // Update any remaining old status values
        DB::table('orders')
            ->where('status', 'accepted')
            ->orWhere('status', 'pending')
            ->orWhere('status', 'dispatched')
            ->orWhere('status', 'delivered')
            ->get(); // Just to ensure we have the right values
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Map new status values back to old ones before changing column type
        DB::table('orders')
            ->where('status', 'accepted')
            ->update(['status' => 'confirmed']);

        DB::table('orders')
            ->where('status', 'dispatched')
            ->orWhere('status', 'out_for_delivery')
            ->update(['status' => 'shipping']);

        DB::table('orders')
            ->where('status', 'packed')
            ->update(['status' => 'confirmed']);

        DB::table('orders')
            ->where('status', 'cancelled')
            ->update(['status' => 'pending']);

        // Change back to original ENUM
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'confirmed', 'shipping', 'delivered') DEFAULT 'pending'");
    }
};
