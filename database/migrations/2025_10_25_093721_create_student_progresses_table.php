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
        Schema::create('student_progresses', function (Blueprint $table) {
            $table->uuid("student_progress_id")->primary();
            $table->uuid('section_item_id');
            $table->foreign('section_item_id')->references('section_item_id')->on('section_items')->onDelete('cascade');
            $table->uuid('assigned_course_id');
            $table->foreign('assigned_course_id')->references('assigned_course_id')->on('assigned_courses')->onDelete('cascade');
            $table->boolean('is_done')->default(false);
            $table->timestamp('done_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_progresses');
    }
};
