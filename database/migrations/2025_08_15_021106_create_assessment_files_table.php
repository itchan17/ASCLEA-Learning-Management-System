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
        Schema::create('assessment_files', function (Blueprint $table) {
            $table->uuid("assessment_file_id")->primary();
            $table->uuid("assessment_id");
            $table->foreign("assessment_id")->references("assessment_id")->on("assessments")->onDelete("cascade");
            $table->string("file_path");
            $table->string("file_name");
            $table->string("file_type");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_files');
    }
};
