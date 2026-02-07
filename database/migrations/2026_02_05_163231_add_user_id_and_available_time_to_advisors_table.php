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
        Schema::table('advisors', function (Blueprint $table) {
            // Add user_id if it doesn't exist
            if (!Schema::hasColumn('advisors', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->onDelete('cascade');
            }
            // Add available_time field
            if (!Schema::hasColumn('advisors', 'available_time')) {
                $table->text('available_time')->nullable()->after('experience');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('advisors', function (Blueprint $table) {
            if (Schema::hasColumn('advisors', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            if (Schema::hasColumn('advisors', 'available_time')) {
                $table->dropColumn('available_time');
            }
        });
    }
};
