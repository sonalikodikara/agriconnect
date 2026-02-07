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
         Schema::create('consultation_availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advisor_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['date', 'week', 'month']);
            $table->date('specific_date')->nullable();
            $table->json('weekdays')->nullable(); // ["Monday","Wednesday"]
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultation_availabilities');
    }
};
