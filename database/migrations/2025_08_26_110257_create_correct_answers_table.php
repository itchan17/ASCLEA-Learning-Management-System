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
        Schema::create('correct_answers', function (Blueprint $table) {
            $table->uuid("correct_answer_id")->primary();
            $table->uuid("question_id");
            $table->foreign("question_id")->references("question_id")->on("questions")->onDelete("cascade");
            $table->text("correct_answer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('correct_answers');
    }
};
