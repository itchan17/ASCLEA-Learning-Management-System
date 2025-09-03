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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid("quiz_id")->primary();
            $table->uuid('assessment_id');
            $table->foreign('assessment_id')->references('assessment_id')->on('assessments')->onDelete('cascade');
            $table->string('quiz_title');
            $table->longText('quiz_description')->nullable();
            $table->integer('quiz_total_points')->nullable();;
            $table->integer('duration')->default(0);
            $table->boolean("cheating_mitigation")->default(false);
            $table->boolean('show_answers_after')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
