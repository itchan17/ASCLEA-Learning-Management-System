<?php

namespace App\Http\Controllers\Admission;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Admission\AdmissionFile;
use App\Models\Student;
use Inertia\Inertia;

class AdmissionFileController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->role->role_name === 'admin') {
            $pendingStudents = Student::with('user')
                ->where('enrollment_status', 'pending')
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            $enrolledStudents = Student::with('user')
                ->whereIn('enrollment_status', ['enrolled','dropout','withdrawn'])
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('Admission/AdmissionPage', [
                'pendingStudents' => $pendingStudents,
                'enrolledStudents' => $enrolledStudents,
                'activeTab' => 0, 
            ]);
        } else {
            $student = Student::where('user_id', $user->user_id)->first();
            return Inertia::render('Admission/AdmissionPage', [
                'student' => $student,
            ]);
        }
    }

    //==================== STORE STUDENT SUBMITTED DOCUMENTS/FILES ====================//
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

    //==================== GET ALL PENDING STUDENTS ====================//
    public function getPendingStudents(Request $request)
    {
    $this->checkAdmin();
    
    // Fetch all students whose enrollment_status is 'pending'
    // and eager load their related user details
    $query = Student::with(['user', 'admissionFiles'])
        ->where('enrollment_status', 'pending');

    if ($search = $request->input('search')) {
        $query->whereHas('user', function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
              ->orWhere('last_name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    $pendingStudents = $query->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admission/AdmissionPage', [
        'pendingStudents' => $pendingStudents,
        ]);
    }

    //==================== VIEW THE CORRESPONDING INFO RELATED TO PENDING STUDENTS ====================//
    public function viewPendingStudent(Student $student)
    {
        $this->checkAdmin();
        $student->load(['user', 'admissionFiles']);

        return Inertia::render('Admission/PendingPage/EnrollmentRequest', [
            'student' => $student,
        ]);
    }

    //==================== GET ALL PENDING STUDENTS ====================//
    public function getEnrolledStudents(Request $request)
    {
        // Get all students whose status is 'enrolled', 'dropout', 'withdrawn' and eager load 'user'
        // Withdrawn enrollment status is not yet available to the model
        $this->checkAdmin();

        $query = Student::with(['user', 'admissionFiles'])
            ->whereIn('enrollment_status', ['enrolled', 'dropout', 'withdrawn']);

        if ($search = $request->input('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $enrolledStudents = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admission/AdmissionPage', [
            'enrolledStudents' => $enrolledStudents,
        ]);
    }

    //==================== VIEW THE CORRESPONDING INFO RELATED TO ENROLLED STUDENTS ====================//
    public function viewEnrolledStudent(Student $student)
    {
        $this->checkAdmin();

        // Eager Load student information and admission files (for debugging and validation)
        $student->load(['user', 'admissionFiles', 'approver']);

        // Get all learning members for this student via user_id
        $learningMembers = \App\Models\LearningMember::with([
            'program',
            'courses.course',
            'courses.assessmentSubmissions.assessment',
        ])->where('user_id', $student->user_id)
        ->get();

        // Flatten completed assessments across all learning members
        $completedAssessments = $learningMembers->flatMap(function ($lm) {
            return $lm->courses->flatMap(function ($assignedCourse) use ($lm) {
                return $assignedCourse->assessmentSubmissions
                    ->whereIn('submission_status', ['submitted', 'returned'])
                    ->map(function ($submission) use ($assignedCourse, $lm) {
                        return [
                            'assessment_name' => $submission->assessment->assessment_title ?? 'N/A',
                            'course_name' => $assignedCourse->course->course_name ?? 'N/A',
                            'program_name' => $lm->program->program_name ?? 'N/A',
                            'score' => $submission->score,
                            'submitted_at' => $submission->submitted_at,
                            'status' => $submission->submission_status,
                        ];
                    });
            });
        });

        return Inertia::render('Admission/EnrolledPage/StudentInfo', [
            'student' => $student,
            'learningMembers' => $learningMembers,
            'completedAssessments' => $completedAssessments,
        ]);
    }

    //==================== FUNCTION OF UPDATING THE INFORMATION OF ACCEPTED/ENROLLED STUDENTS ====================//
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
        'enrollment_status' => 'nullable|in:enrolled,pending,dropout,withdrawn', //Withdrawn enrollment status do not exist yet in the model
        'admission_status' => 'nullable|in:Not Submitted,Pending,Accepted,Rejected',
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
        'admission_status' => $request->admission_status ?? $student->admission_status,
    ]);
        return redirect()->back()->with('success', 'Student updated successfully.');
    }

    //==================== LOGIC FOR UPDATING THE ENROLLMENT STATUS BASED ON THE STUDENT'S ADMISSION STATUS ====================//
    public function EnrollmentStatus($admission_status)
    {
        return $admission_status === 'Accepted' ? 'enrolled' : 'pending';
    }

    //==================== UPDATE STATUS FUNCTION TO UPDATE THE ADMISSION STATUS OF STUDENTS ====================//
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'admission_status' => 'required|in:Not Submitted,Pending,Accepted,Rejected',
            'admission_message' => 'nullable|string|max:500',
        ]);

        $student = Student::findOrFail($id);

        // Update admission details
        $student->admission_status = $validated['admission_status'];
        $student->admission_message = $validated['admission_message'] ?? null;
        $student->approved_by = auth()->id();

        // Automatically update enrollment_status based on admission_status
        $student->enrollment_status = $this->EnrollmentStatus($student->admission_status);

        // If the student is accepted and enrolled, update payment to "paid"
        if ($student->admission_status === 'Accepted' && $student->enrollment_status === 'enrolled') {
            $student->payment = 'paid';
            $student->approved_at = now();
        } else {
            $student->payment = 'unpaid';
            $student->approved_at = null;
        }

        $student->save();
        
        // If the Student has been approved, the toast status is success and will direct the admin to the admission page
        if ($student->admission_status === 'Accepted' && $student->enrollment_status === 'enrolled') {
            return redirect()->route('admission.index')->with('success', 'Student approved successfully!');
        }

        // If the Student is pending and updated as rejected, the toast status is error and will stay on the view enrollment request page
        return redirect()->back()->with('error', 'Student Enrollment Request has been ' . strtolower($student->admission_status) . '.');
        //return redirect()->route('admission.index')->with('success', 'Status updated successfully.');
    }

    //==================== ARCHIVE ENROLLED STUDENTS ====================//
    public function archive(Student $student)
    {
        $this->checkAdmin();

        // Soft delete the enrolled student
        $student->delete();

        // Soft delete the related user
        if ($student->user) {
            $student->user->delete();
        }
        return redirect()->route('admission.index')->with('success', 'Student archived successfully.');
    }

    public function updateProfile(Request $request, $id)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $student = Student::findOrFail($id);
        $user = $student->user;

        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $filePath = $file->store('profile_images', 'public');

            // Delete old photo if exists
            if ($user->profile_image && \Storage::disk('public')->exists($user->profile_image)) {
                \Storage::disk('public')->delete($user->profile_image);
            }

            $user->profile_image = $filePath;
            $user->save();
        }

        return back()->with('success', 'Profile photo updated successfully.');
    }

    protected function checkAdmin()
    {
        if (!auth()->check() || auth()->user()->role->role_name !== 'admin') {
            abort(403, 'Unauthorized');
        }
    }

    public function streamAdmissionFile(Student $student, AdmissionFile $file)
    {
        $this->checkAdmin();

        // Ensure the file belongs to the student
        abort_if($file->student_id !== $student->student_id, 403, 'Unauthorized');

        // Stream the file from storage
        return response()->file(storage_path('app/public/' . $file->file_path));
    }
    
    public function downloadAdmissionFile(Student $student, AdmissionFile $file)
    {
        $this->checkAdmin();

        // Ensure the file belongs to the student
        abort_if($file->student_id !== $student->student_id, 403, 'Unauthorized');

        // Force file download
        return response()->download(storage_path('app/public/' . $file->file_path), $file->file_name);
    }


}
