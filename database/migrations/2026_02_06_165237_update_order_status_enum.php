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
        // SQLite stores enum as text, so we just need to update existing values
        // Map old status values to new ones
        DB::table('orders')
            ->where('status', 'confirmed')
            ->update(['status' => 'accepted']);

        DB::table('orders')
            ->where('status', 'shipping')
            ->update(['status' => 'dispatched']);

        // Note: SQLite doesn't enforce enum constraints, so the column will accept
        // the new values. Validation will be handled in the Order model.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Map new status values back to old ones
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
    }
};
