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
       Schema::table('consultation_availabilities', function (Blueprint $table) {
            $table->json('months')->nullable()->after('weekdays');
        });
    }

    public function down(): void
    {
        Schema::table('consultation_availabilities', function (Blueprint $table) {
            $table->dropColumn('months');
        });

    }
};
