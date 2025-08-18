<?php

namespace Database\Factories\Programs;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AssessmentFactory extends Factory
{
    public function definition(): array
    {
        $adminUserId = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'admin')
            ->value('users.user_id');


        return [
            'assessment_title' => $this->faker->sentence(3),
            'assessment_description' => "<p>" . $this->faker->paragraph . "</p>",
            'due_datetime' => $this->faker->dateTimeBetween('now', '+10 days'),
            'created_by' => $adminUserId,
            'created_at' => $this->faker->date(now()),
            'updated_at' => $this->faker->date(now())
        ];
    }
}
