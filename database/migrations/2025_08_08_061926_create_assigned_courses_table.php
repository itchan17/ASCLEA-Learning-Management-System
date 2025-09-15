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
        Schema::create('assigned_courses', function (Blueprint $table) {
            $table->uuid('assigned_course_id')->primary();
            $table->uuid('learning_member_id');
            $table->foreign('learning_member_id')->references('learning_member_id')->on('learning_members')->onDelete('cascade');
            $table->uuid('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
            $table->unique(['learning_member_id', 'course_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assigned_courses');
    }
};
