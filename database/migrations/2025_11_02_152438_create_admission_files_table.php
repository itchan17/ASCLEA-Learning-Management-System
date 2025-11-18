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
        Schema::create('admission_files', function (Blueprint $table) {
            $table->uuid('admission_file_id')->primary(); // UUID primary key

            // Foreign key to students table
            $table->uuid('student_id');
            $table
                ->foreign('student_id')
                ->references('student_id')
                ->on('students')
                ->onDelete('cascade');

            // File details
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type')->nullable();

            // Timestamps
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_files');
    }
};
