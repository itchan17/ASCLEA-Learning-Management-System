<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detected_cheating_files', function (Blueprint $table) {
            $table->uuid('detected_cheating_file_id')->primary(); // UUID primary key
            $table->uuid('detected_cheating_id'); // Foreign key to detected_cheatings
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->timestamp('uploaded_at')->useCurrent();

            // Foreign key constraint
            $table->foreign('detected_cheating_id')
                  ->references('cheating_id')
                  ->on('detected_cheatings')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detected_cheating_files');
    }
};
