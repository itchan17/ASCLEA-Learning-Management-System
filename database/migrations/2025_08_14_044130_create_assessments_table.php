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
        Schema::create('assessments', function (Blueprint $table) {
            $table->uuid('assessment_id')->primary();
            $table->uuid('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
            $table->uuid('assessment_type_id');
            $table->foreign('assessment_type_id')->references('assessment_type_id')->on('assessment_types')->onDelete('cascade');
            $table->string('assessment_title');
            $table->longText('assessment_description')->nullable();
            $table->dateTime('due_datetime')->nullable();
            $table->integer('total_points');
            $table->uuid('created_by');
            $table->enum('status', ['published', 'draft']);
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->json('feedback')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
