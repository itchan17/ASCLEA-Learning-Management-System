<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountingController extends Controller
{
    public function paidStudents()
    {
        $students = Student::where('payment', 'paid')
            ->with(['user:user_id,first_name,last_name,middle_name,email'])
            ->latest()
            ->paginate(10);

        $students->getCollection()->transform(function ($student) {
            return [
                'id' => $student->student_id,
                'name' => $student->user->first_name . ' ' . ($student->user->last_name ?? ''),
                'email' => $student->user->email ?? 'N/A',
                'program' => 'N/A',
            ];
        });

        return Inertia::render('Accounting/PaidStudents', [
            'students' => $students,
        ]);
    }
}
