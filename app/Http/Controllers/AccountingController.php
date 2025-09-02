<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;


class AccountingController extends Controller
{

    public function paidStudents()
    {
        $students = Student::where('payment', 'paid') 
            ->with(['user' => fn($q) => $q->select('user_id', 'first_name', 'last_name', 'middle_name', 'email')])
            ->get();

        $result = $students->map(fn($student) => [
            'id' => $student->student_id,
            'name' => $student->user->first_name . ' ' . $student->user->last_name ?? 'N/A',
            'email' => $student->user->email ?? 'N/A',
            'program' => 'N/A',
        ]);

        return response()->json($result);

    }

}