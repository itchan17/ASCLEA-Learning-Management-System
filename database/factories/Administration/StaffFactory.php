<?php

namespace Database\Factories\Administration;

use App\Models\Administration\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Administration\Staff>
 */
class StaffFactory extends Factory
{
    protected $model = Staff::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $creator = User::inRandomOrder()->first();

        return [
            'staff_id' => (string) Str::uuid(),
            'user_id' => $user->user_id,
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'created_by' => $creator->user_id,
        ];
    }
}
