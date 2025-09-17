<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\Administration\Staff;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // Show the administration dashboard
    public function administrationIndex(Request $request)
    {
        // Fetch role IDs for 'admin' and 'faculty'
        $roleIds = Role::whereIn('role_name', ['admin', 'faculty'])->pluck('role_id')->toArray();

        // Query Staff with related user, filtered by role
        $query = Staff::with(['user.role', 'user.lastLogin', 'user.lastLogout']) // load the user and their role
        ->whereHas('user', function($q) use ($roleIds) {
        $q->whereIn('role_id', $roleIds);
        });

        // Search filter
        if ($search = $request->input('search')) {
            $query->whereHas('user', function($q) use ($search) {
                $q->where('users.first_name', 'like', "%{$search}%")
                ->orWhere('users.last_name', 'like', "%{$search}%")
                ->orWhere('users.email', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $staffs = $query->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Administration/Administration', [
            'staffs' => $staffs,
            'filters' => $request->only(['search', 'status']),
        ]);
    }


    public function administrationView($staffId)
    {
        $staff = Staff::with(['user.role', 'createdBy', 'assignedCourses.course.program'])
            ->findOrFail($staffId);

        // Only load assigned courses if faculty
        $assignedCourses = [];
        if ($staff->user->role->role_name === 'faculty') {
            $assignedCourses = $staff->assignedCourses()
                ->with('course.program')
                ->paginate(5)
                ->through(function ($assignedCourse) {
                    $course = $assignedCourse->course;
                    return [
                        'program_id' => optional($course->program)->program_id,
                        'program_name' => optional($course->program)->program_name,
                        'course_id' => $course->course_id ?? null,
                        'course_code' => $course->course_code ?? null,
                        'course_name' => $course->course_name ?? null,
                        'course_day' => $course->course_day ?? null,
                        'start_time' => $course->start_time ?? null,
                        'end_time' => $course->end_time ?? null,
                    ];
                });
        }

        return Inertia::render('Administration/AdministrationComponents/ViewStaff', [
            'staffDetails' => $staff,
            'assignedCourses' => $assignedCourses, // ✅ pass courses here
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereNotIn('user_id', Staff::pluck('user_id'))->get();

        return Inertia::render('Staff/Create', [
            'users' => $users
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role_name' => 'required|in:admin,faculty',
        ]);

        $role = Role::where('role_name', $request->role_name)->firstOrFail();

        // create user
        $user = User::create([
            'user_id' => Str::uuid(),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'role_id' => $role->role_id,
            'password' => bcrypt('password123'), // temporary password
        ]);

        // create staff
        Staff::create([
            'staff_id' => Str::uuid(),
            'user_id' => $user->user_id,
            'status' => 'active',
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Staff added successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Load the staff along with the related user info
        $staff = Staff::with('user')->findOrFail($id);

        return Inertia::render('Staff/Show', [
            'staff' => $staff,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $staff = Staff::with(['user.role', 'createdBy'])->findOrFail($id);

        return Inertia::render('Staff/Edit', [
            'staff' => $staff
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $staff = Staff::with('user')->findOrFail($id);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users,email,' . $staff->user->user_id . ',user_id',
            'contact_number' => 'nullable|string|max:20',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'house_no' => 'nullable|string|max:255',
            'region' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive'
        ]);

        // Update all user info (all fields in $fillable)
        $staff->user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
            'status' => $request->status
        ]);
        
        $staff->user->update([
            'house_no' => $request->house_no,
            'region' => $request->region,
            'province' => $request->province,
            'city' => $request->city,
            'barangay' => $request->barangay,
        ]);


        return redirect()->back()->with('success', 'Staff updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
        $staff->delete(); // uses SoftDeletes

        return redirect()->route('administration.index')->with('success', 'Staff archived successfully.');
    }

    public function updateProfile(Request $request, $id)
    {
        $staff = Staff::with('user')->findOrFail($id);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');

            // update profile_image on the related user
            $staff->user->update([
                'profile_image' => $path,
            ]);
        }

        return back()->with('success', 'Profile updated successfully!');
    }

    /**
     * Display all assigned courses for a faculty staff member across all programs.
     */
    





}