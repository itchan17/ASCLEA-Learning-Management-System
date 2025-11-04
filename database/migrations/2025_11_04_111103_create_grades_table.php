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
        Schema::create('grades', function (Blueprint $table) {
            $table->uuid('grade_id')->primary();
            $table->uuid('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
            $table->uuid('assigned_course_id');
            $table->foreign('assigned_course_id')->references('assigned_course_id')->on('assigned_courses')->onDelete('cascade');
            $table->enum('status', ['graded', 'returned']);
            $table->integer('grade');
            $table->uuid('graded_by');
            $table->foreign('graded_by')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
