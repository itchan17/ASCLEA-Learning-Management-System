<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Student;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a valid role_id from roles table
        $studentRoleId = DB::table('roles')->where('role_name', 'student')->value('role_id');
        $adminRoleId = DB::table('roles')->where('role_name', 'admin')->value('role_id');
        $facultyRoleId = DB::table('roles')->where('role_name', 'faculty')->value('role_id');

        // Create 50 users with student roles
        User::factory()
            ->count(50)
            ->has(
                Student::factory()
                    ->state(function (array $attributes, User $user) {
                        return [
                            'user_id' => $user->user_id,
                            'enrollment_status' => 'enrolled'
                        ];
                    })
            )
            ->create([
                'role_id' =>  $studentRoleId,
            ]);

        // Create 5 users with faculty role
        User::factory()
            ->count(5)
            ->create([
                'role_id' =>  $facultyRoleId,
            ]);

        DB::table('users')->insert([
            [
                'user_id' => Str::uuid(),
                'first_name' => 'Carlos',
                'last_name' => 'Garcia',
                'middle_name' => 'Mendoza',
                'birthdate' => '1988-03-20',
                'gender' => 'male',
                'contact_number' => '09192345678',
                'email' => 'carlos.garcia@example.com',
                'house_no' => '789',
                'province' => 'Davao del Sur',
                'city' => 'Davao City',
                'barangay' => 'Barangay Matina',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('instructorPass789'),
                'role_id' => $studentRoleId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => Str::uuid(),
                'first_name' => 'Juan',
                'last_name' => 'Dela Cruz',
                'middle_name' => 'Santos',
                'birthdate' => '1990-01-01',
                'gender' => 'male',
                'contact_number' => '09171234567',
                'email' => 'juan.delacruz@example.com',
                'house_no' => '123',
                'province' => 'Metro Manila',
                'city' => 'Quezon City',
                'barangay' => 'Barangay Commonwealth',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('password123'),
                'role_id' => $adminRoleId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => Str::uuid(),
                'first_name' => 'Maria',
                'last_name' => 'Reyes',
                'middle_name' => 'Lopez',
                'birthdate' => '1995-07-15',
                'gender' => 'female',
                'contact_number' => '09181234567',
                'email' => 'maria.reyes@example.com',
                'house_no' => '456',
                'province' => 'Cebu',
                'city' => 'Cebu City',
                'barangay' => 'Barangay Lahug',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('securePass456'),
                'role_id' => $facultyRoleId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
