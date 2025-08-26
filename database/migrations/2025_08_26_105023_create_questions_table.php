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
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid("question_id")->primary();
            $table->uuid("quiz_id");
            $table->foreign("quiz_id")->references("quiz_id")->on("quizzes")->onDelete("cascade");
            $table->text("question");
            $table->enum('question_type', ['multiple_choice', 'true_or_false', 'identification']);
            $table->integer("question_points")->nullable();
            $table->boolean("is_required")->default(false);
            $table->integer("sort_order");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
