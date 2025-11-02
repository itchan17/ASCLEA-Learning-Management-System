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
            'files.*' => 'required|file|mimes:jpg,jpeg,png,pdf,docx,doc|max:5120', // 5MB max each
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
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

        // Return as JSON (for API) or Inertia page props if you're using Inertia
        return response()->json($pendingStudents);
    }

}
