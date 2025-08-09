<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\AssignedCourse;
use App\Models\LearningMember;
use App\Models\Program;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PeopleController extends Controller
{
    public function listUsers(Program $program, Request $req) {
        $programId = $program->program_id;

        // Inital query without filter or search
        // Get users that is not an admin and not a member of the program
        $result = User::with('role')->select('user_id', 'first_name', 'last_name', 'email', 'role_id')->whereHas('role', function($query) {
            $query->where('role_name', '!=', 'admin'); // Filter out admin users
        })->whereNotNull('email_verified_at')->whereNotIn('user_id', function ($query) use ($programId) {
            $query->select('user_id')
                ->from('learning_members')
                ->where('program_id', $programId); // Select users that is not a member of the current program
        })->where(function ($query) {
            $query->whereHas('student', function ($q) {
                $q->whereNotNull('approved_at'); // Filter users that has student relationship and not approved
            })
            ->orWhereDoesntHave('student'); // Include users with no student relationship specifically faculty
        });
        
        if($role = $req->input('role'))  {
            $filteredRoleId = Role::where('role_name', $role)->value('role_id'); // Get the filtered role from the request query
      
            $result->where('role_id', '=', $filteredRoleId); // Filter based on the role
        }
        // Searching is after filtering role to ensure that the user that will be search is only based on the role
        if($search = $req->input('search')) {
            // Filter based on the search value from 3 columns
            $result->where(function ($query) use ($search) {
                $query->whereLike('first_name', "%$search%")
                ->orWhereLike('last_name', "%$search%")
                ->orWhereLike('email', "%$search%");
            });
        }

        // Sort and paginate by 10
        $users = $result->orderBy('created_at', 'desc')->orderBy('user_id', 'desc')->paginate(10);
  
        return response()->json($users);
    }

    public function addMember($programId, Request $req) {
 
        if($req->is_select_all){
                $users = User::query();

                // Retrieve users that not is a member of the current program
                $users->whereDoesntHave('programs', function ($query) use ($programId) {
                    $query->where('program_id', $programId);
                });

                if(!empty($req->unselected_users)){
                    $users->whereNotIn('user_id', $req->unselected_users); // Rerieve users that are not unselected
                }

                $users = $users->pluck('user_id')->toArray();
        }
        else {
                $users = User::whereIn('user_id', $req->selected_users)
                    ->whereDoesntHave('programs', function ($query) use ($programId) { // Filter out users that already member 
                        $query->where('program_id', $programId);
                    })
                    ->pluck('user_id')->toArray(); // Retrieve users based on the selected IDs
        }

        $now = Carbon::now();

        $data = array_map(function ($userId) use ($programId, $now) {
                    return   [
                            'program_id' => $programId, 
                            'user_id' => $userId,
                            'learning_member_id' => (string) Str::uuid(), 
                            'updated_at' => $now,
                            'created_at' => $now,
                    ];
                }, $users);

        // Data should not have duplicate in the table before inserting
        LearningMember::insert($data);

        return back()->with('success', 'Users added successfully.');
    } 

    public function removeMember($programId, LearningMember $member) {
      
        if($member) {
            $member->delete();
        }

        return back()->with('success', 'Member removed successfully.');
    }   

    public function viewMember(Program $program, LearningMember $member) {
    
        return Inertia::render('Programs/ProgramComponent/PeopleComponent/ViewMember', [
            'member_data' => fn () => $member->load(['user' => function ($query) {
                                            $query->select('user_id', 'role_id', 'first_name', 'last_name')
                                                ->with(['role' => function ($query) {
                                                    $query->select('role_id', 'role_name');
                                                }]);
                                        }]),

            'assigned_courses' => fn () => $member->courses()
            ->with([
                'course' => function ($query) {
                $query->select(
                    'course_id',
                    'course_code', 
                    'course_name', 
                    'course_day', 
                    'start_time', 
                    'end_time');
                }])
            ->orderBy('created_at', 'desc')
            ->get()
            ]);
        
    }

    public function listCourses(Program $program, LearningMember $member) {

        $courses = $program->courses()->whereDoesntHave('assignedTo',  function ($query) use ($member) {
                            $query->where('learning_member_id', $member->learning_member_id);
                        })->select('course_id', 'course_code', 'course_name', 'course_day', 'start_time', 'end_time')->orderBy('created_at', 'desc')->get();

        return response()->json($courses);
    }

    public function assignCourses(Program $program, $memberId, Request $req) {
        $courses = $req->courses_to_assign;
        
        if(!empty($courses)) {
           $validCourses = $program->courses() // Get the courses of the program
                ->whereIn('course_id', $courses) // Get courses that is in the selected courses
                ->whereDoesntHave('assignedTo', function ($query) use ($memberId) { // Filter out courses that alreading assigned
                    $query->where('learning_member_id', $memberId);
                })
                ->pluck('course_id')
                ->toArray();

            
            $now = Carbon::now();

            $data = array_map(function ($validCourseId) use ($memberId, $now) {
                        return   [
                                'assigned_course_id' => (string) Str::uuid(), 
                                'learning_member_id' => $memberId, 
                                'course_id' => $validCourseId,
                                'updated_at' => $now,
                                'created_at' => $now,
                        ];
                    }, $validCourses);
          
            AssignedCourse::insert($data);
        }

        $label = count($data) > 1 ? "Courses" : "Course";

        return back()->with('success', "$label assigned successfully.");
        
    }

    public function removeAssignedCourse($programId, $memberId, AssignedCourse $assignedCourse) {
      
        if($assignedCourse) {
            $assignedCourse->delete();
        }

        return back()->with('success', 'Course removed successfully.');
    } 
}
