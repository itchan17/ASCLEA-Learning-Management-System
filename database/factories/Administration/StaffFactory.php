<?php

namespace Database\Factories\Administration;

use App\Models\Administration\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Administration\Staff>
 */
class StaffFactory extends Factory
{
    protected $model = Staff::class;

    public function definition(): array
    {
        // Fetch role IDs for 'admin' and 'faculty'
        $roleIds = Role::whereIn('role_name', ['admin', 'faculty'])->pluck('role_id')->toArray();

        // Fetch a random user that has only admin or faculty role
        $user = User::whereIn('role_id', $roleIds)->inRandomOrder()->first();


        // Get a random creator (any user)
        $creator = User::inRandomOrder()->first();

        return [
            'staff_id' => (string) Str::uuid(),
            'user_id' => $user->user_id,
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'created_by' => $creator->user_id,
        ];
    }
}

