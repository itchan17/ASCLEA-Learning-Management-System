<?php

namespace Database\Seeders;

use App\Models\Programs\Assessment;
use App\Models\Programs\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activityId = DB::table('assessment_types')->where('assessment_type', 'activity')->value('assessment_type_id');
        $quizId = DB::table('assessment_types')->where('assessment_type', 'quiz')->value('assessment_type_id');
        $courseId = DB::table('courses')->first()->course_id;

        // Create Activity
        Assessment::factory()
            ->count(10)
            ->create([
                'total_points' => 100,
                'status' => "draft",
                'assessment_type_id' => $activityId,
                'course_id' => $courseId,
            ]);

        Assessment::factory()
            ->count(10)
            ->create([
                'total_points' => 100,
                'status' => "published",
                'assessment_type_id' => $activityId,
                'course_id' => $courseId,
            ]);

        // Quiz
        Assessment::factory()
            ->count(10)
            ->has(
                Quiz::factory()
                    ->state(function (array $attributes, Assessment $assessment) {
                        return [
                            'assessment_id' => $assessment->assessment_id,
                            'quiz_title' => 'New Quiz'
                        ];
                    })
            )
            ->create([
                'total_points' => 0,
                'status' => "draft",
                'assessment_type_id' => $quizId,
                'course_id' => $courseId,
            ]);
    }
}
