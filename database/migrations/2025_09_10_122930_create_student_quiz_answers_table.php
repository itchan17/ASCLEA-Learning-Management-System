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
        Schema::create('student_quiz_answers', function (Blueprint $table) {
            $table->uuid("student_quiz_answer_id")->primary();
            $table->uuid('assessment_submission_id');
            $table->foreign('assessment_submission_id')->references('assessment_submission_id')->on('assessment_submissions')->restrictOnDelete();
            $table->uuid('question_id');
            $table->foreign('question_id')->references('question_id')->on('questions')->restrictOnDelete();
            $table->uuid('answer_id')->nullable();
            $table->foreign('answer_id')->references('question_option_id')->on('question_options')->restrictOnDelete();
            $table->string('answer_text')->nullable();
            $table->boolean('is_correct');
            $table->json('feedback')->nullable();
            $table->unique(['assessment_submission_id', 'question_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_quiz_answers');
    }
};
