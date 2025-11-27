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
        Schema::create('activity_files', function (Blueprint $table) {
            $table->uuid("activity_file_id")->primary();
            $table->uuid("assessment_submission_id");
            $table->foreign("assessment_submission_id")->references("assessment_submission_id")->on("assessment_submissions")->onDelete("cascade");
            $table->string("file_path");
            $table->string("original_file_path")->nullable();
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
        Schema::dropIfExists('activity_files');
    }
};
