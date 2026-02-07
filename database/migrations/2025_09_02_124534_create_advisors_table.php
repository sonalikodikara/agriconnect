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
        Schema::create('advisors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('district');
            $table->string('province');
            $table->text('address');
            $table->text('description')->nullable();
            $table->text('qualifications')->nullable(); // optional
            $table->text('specialization')->nullable(); // store as JSON
            $table->text('certifications')->nullable(); // store as JSON
            $table->string('website')->nullable();
            $table->date('established')->nullable();
            $table->integer('experience')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advisors');
    }
};
