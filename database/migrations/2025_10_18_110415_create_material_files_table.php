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
        Schema::create('material_files', function (Blueprint $table) {
            $table->uuid('material_file_id')->primary();
            $table->uuid("material_id");
            $table->foreign("material_id")->references("material_id")->on("materials")->onDelete("cascade");
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
        Schema::dropIfExists('material_files');
    }
};
