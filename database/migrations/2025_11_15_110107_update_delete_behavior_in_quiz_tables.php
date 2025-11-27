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
        // student_quiz_answers
        Schema::table('student_quiz_answers', function (Blueprint $table) {
            // Drop existing FKs
            $table->dropForeign(['assessment_submission_id']);
            $table->dropForeign(['question_id']);
            $table->dropForeign(['answer_id']);

            // Re-add with cascadeOnDelete()
            $table->foreign('assessment_submission_id')
                ->references('assessment_submission_id')
                ->on('assessment_submissions')
                ->onDelete('cascade');

            $table->foreign('question_id')
                ->references('question_id')
                ->on('questions')
                ->onDelete('cascade');

            $table->foreign('answer_id')
                ->references('question_option_id')
                ->on('question_options')
                ->onDelete('cascade');
        });

        // assessment_submissions
        Schema::table('assessment_submissions', function (Blueprint $table) {
            // Drop existing FKs
            $table->dropForeign(['assessment_id']);
            $table->dropForeign(['submitted_by']);

            // Re-add with cascadeOnDelete()
            $table->foreign('assessment_id')
                ->references('assessment_id')
                ->on('assessments')
                ->onDelete('cascade');

            $table->foreign('submitted_by')
                ->references('assigned_course_id')
                ->on('assigned_courses')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse changes back to restrictOnDelete()
        Schema::table('student_quiz_answers', function (Blueprint $table) {
            $table->dropForeign(['assessment_submission_id']);
            $table->dropForeign(['question_id']);
            $table->dropForeign(['answer_id']);

            $table->foreign('assessment_submission_id')
                ->references('assessment_submission_id')
                ->on('assessment_submissions')
                ->restrictOnDelete();

            $table->foreign('question_id')
                ->references('question_id')
                ->on('questions')
                ->restrictOnDelete();

            $table->foreign('answer_id')
                ->references('question_option_id')
                ->on('question_options')
                ->restrictOnDelete();
        });

        Schema::table('assessment_submissions', function (Blueprint $table) {
            $table->dropForeign(['assessment_id']);
            $table->dropForeign(['submitted_by']);

            $table->foreign('assessment_id')
                ->references('assessment_id')
                ->on('assessments')
                ->restrictOnDelete();

            $table->foreign('submitted_by')
                ->references('assigned_course_id')
                ->on('assigned_courses')
                ->restrictOnDelete();
        });
    }
};
