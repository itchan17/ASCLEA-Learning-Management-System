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
        Schema::create('section_items', function (Blueprint $table) {
            $table->uuid("section_item_id")->primary();
            $table->uuid('section_id');
            $table->foreign('section_id')->references('section_id')->on('sections')->onDelete('cascade');
            $table->uuidMorphs('item');
            $table->integer("order");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_items');
    }
};
