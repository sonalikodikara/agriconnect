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
        Schema::create('consultation_time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_availability_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultation_time_slots');
    }
};
