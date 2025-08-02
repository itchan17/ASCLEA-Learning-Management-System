<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'middle_name' => $this->faker->firstName(),
            'birthdate' => $this->faker->date('Y-m-d', now()->subYears(18)), 
            'gender' => $this->faker->randomElement(['male', 'female']),
            'contact_number' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'house_no' => $this->faker->buildingNumber(),
            'province' => $this->faker->state(),
            'city' => $this->faker->city(),
            'barangay' => $this->faker->streetName(),
            'password' => bcrypt('password'), 
            'email_verified_at' => $this->faker->date(now()),
        ];
    }
}


