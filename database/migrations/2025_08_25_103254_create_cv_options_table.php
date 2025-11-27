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
        Schema::create('cv_options', function (Blueprint $table) {
            $table->uuid("cv_option_id")->primary();
            $table->uuid("quiz_id");
            $table->foreign("quiz_id")->references("quiz_id")->on("quizzes")->onDelete("cascade");
            $table->enum('options', ['book', 'laptop', 'cellphone', 'up', 'down', 'left', 'right']);
            $table->unique(['quiz_id', 'options']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_options');
    }
};
