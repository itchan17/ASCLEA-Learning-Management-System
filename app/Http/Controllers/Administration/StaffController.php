<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\Staff;
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
    public function administrationIndex()
    {
        return Inertia::render('Administration/Administration');
    }

    // Show the staff detail page (wrapper)
    public function administrationView($userId)
    {
        return Inertia::render('Administration/AdministrationComponents/ViewStaff', [
            'userId' => $userId,
        ]);
    }

    public function index(Request $request)
    {
        $query = Staff::query()
            ->with('user') // eager load user info
            ->whereHas('user', function($q) {
                $q->whereIn('role', ['admin','faculty']);
            });

        // Search filter
        if ($search = $request->input('search')) {
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $staffs = $query->orderBy('created_at', 'desc')
            ->paginate(10) // adjust per page
            ->withQueryString();

        return Inertia::render('Staff/Index', [
            'staffs' => $staffs,
            'filters' => $request->only(['search','status']),
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
            'user_id' => 'required|exists:users,user_id|unique:staff,user_id',
            'status' => 'required|in:active,inactive',
        ]);

        $staff = Staff::create([
            'staff_id' => Str::uuid(),
            'user_id' => $request->user_id,
            'status' => $request->status,
            'created_by' => auth()->user()->user_id, // assuming you have auth
        ]);

        return redirect()->route('staff.index')->with('success', 'Staff added successfully.');
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
        $staff = Staff::with('user')->findOrFail($id);

        return Inertia::render('Staff/Edit', [
            'staff' => $staff
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $staff = Staff::findOrFail($id);

        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $staff->update([
            'status' => $request->status,
        ]);

        return redirect()->route('staff.index')->with('success', 'Staff updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
        $staff->delete(); // uses SoftDeletes

        return redirect()->route('staff.index')->with('success', 'Staff archived successfully.');
    }

    public function showAssignedCourses($id)
    {
        $staff = Staff::with('assignedCourses')->findOrFail($id);

        $courses = $staff->assignedCourses()->paginate(10);

        return Inertia::render('Staff/AssignedCourses', [
            'staff' => $staff,
            'courses' => $courses
        ]);
    }

}
