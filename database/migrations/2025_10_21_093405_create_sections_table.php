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
        Schema::create('sections', function (Blueprint $table) {
            $table->uuid("section_id")->primary();
            $table->uuid('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
            $table->string('section_title');
            $table->enum('status', ['published', 'draft']);
            $table->uuid('created_by');
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
