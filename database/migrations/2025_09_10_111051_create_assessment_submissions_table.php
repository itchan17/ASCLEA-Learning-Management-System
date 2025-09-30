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
        Schema::create('assessment_submissions', function (Blueprint $table) {
            $table->uuid("assessment_submission_id")->primary();
            $table->uuid('assessment_id');
            $table->foreign('assessment_id')->references('assessment_id')->on('assessments')->restrictOnDelete();
            $table->uuid('submitted_by');
            $table->foreign('submitted_by')->references('assigned_course_id')->on('assigned_courses')->restrictOnDelete();
            $table->timestamp('submitted_at')->nullable();
            $table->integer('score')->default(0);
            $table->json('feedback')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_submissions');
    }
};
