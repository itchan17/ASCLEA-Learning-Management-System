<?php

namespace App\Http\Controllers\Admission;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Admission\AdmissionFile;
use App\Models\Student;

class AdmissionFileController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        $student = Student::where('user_id', $user->user_id)->firstOrFail();

        $request->validate([
            'files.*' => 'required|file|max:5120', // 5MB max each
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $extension = strtolower($file->getClientOriginalExtension());

                $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
                if (!in_array($extension, $allowedExtensions)) {
                    return back()->with('error', 'Only JPG, JPEG, PNG, or PDF files are allowed.');
                }

                $path = $file->store('admission', 'public');

                AdmissionFile::create([
                    'admission_file_id' => Str::uuid(),
                    'student_id' => $student->student_id,
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                    'uploaded_at' => now(),
                ]);
            }

            $student->update(['admission_status' => 'Pending']);

            return back()->with('success', 'Files uploaded successfully!');
        }

        return back()->with('error', 'No files were uploaded.');
    }

    public function getPendingStudents()
    {
        // Fetch all students whose enrollment_status is 'pending'
        // and eager load their related user details
        $pendingStudents = \App\Models\Student::with('user')
            ->where('enrollment_status', 'pending')
            ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

        return response()->json($pendingStudents);
    }

    public function getEnrolledStudents()
    {
        // Get all students whose status is 'enrolled', 'dropout', 'withdrawn' and eager load 'user'
        // Withdrawn enrollment status is not yet available to the model
        $enrolledStudents = \App\Models\Student::with('user')
            ->whereIn('enrollment_status', ['enrolled', 'dropout', 'withdrawn'])
            ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

        return response()->json($enrolledStudents);
    }

    //Function of Updating the Information of Accepted Students
    public function updateStudent(Request $request, Student $student)
    {
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'middle_name' => 'nullable|string|max:255',
        'email' => 'required|email|unique:users,email,' . $student->user->user_id . ',user_id',
        'contact_number' => 'nullable|string|max:20',
        'birthdate' => 'nullable|date',
        'gender' => 'nullable|in:male,female,other',
        'program' => 'nullable|string|max:255',
        'enrollment_status' => 'nullable|in:enrolled,dropout,withdrawn', //Withdrawn enrollment status do not exist yet in the model
        'house_no' => 'nullable|string|max:255',
        'region' => 'nullable|string|max:255',
        'province' => 'nullable|string|max:255',
        'city' => 'nullable|string|max:255',
        'barangay' => 'nullable|string|max:255',
    ]);

    $student->user->update([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'middle_name' => $request->middle_name,
        'email' => $request->email,
        'contact_number' => $request->contact_number,
        'birthdate' => $request->birthdate,
        'gender' => $request->gender,
        'house_no' => $request->house_no,
        'region' => $request->region,
        'province' => $request->province,
        'city' => $request->city,
        'barangay' => $request->barangay,
    ]);

    $student->update([
        'enrollment_status' => $request->enrollment_status,
    ]);
        return redirect()->back()->with('success', 'Student updated successfully.');
    }

}
