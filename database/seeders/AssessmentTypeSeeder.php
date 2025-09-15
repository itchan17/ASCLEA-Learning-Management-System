<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AssessmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('assessment_types')->insert([
            [
                'assessment_type_id' => Str::uuid(),
                'assessment_type' => 'activity',
            ],
            [
                'assessment_type_id' => Str::uuid(),
                'assessment_type' => 'quiz',
            ],
        ]);
    }
}
