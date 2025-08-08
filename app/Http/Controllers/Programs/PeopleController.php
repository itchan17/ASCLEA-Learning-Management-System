<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\LearningMember;
use App\Models\Program;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PeopleController extends Controller
{
    public function listUsers(Program $program, Request $req) {
        $program_id = $program->program_id;

        // Inital query without filter or search
        // Get users that is not an admin and not a member of the program
        $result = User::with('role')->select('user_id', 'first_name', 'last_name', 'email', 'role_id')->whereHas('role', function($query) {
            $query->where('role_name', '!=', 'admin'); // Filter out admin users
        })->whereNotNull('email_verified_at')->whereNotIn('user_id', function ($query) use ($program_id) {
            $query->select('user_id')
                ->from('learning_members')
                ->where('program_id', $program_id); // Select users that is not a member of the current program
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

    public function addMember($program_id, Request $req) {
 
       if($req->is_select_all){
            $users = User::query();

            // Retrieve users that not is a member of the current program
            $users->whereDoesntHave('programs', function ($query) use ($program_id) {
                $query->where('program_id', $program_id);
            });

            if(!empty($req->unselected_users)){
                $users->whereNotIn('user_id', $req->unselected_users); // Rerieve users that are not unselected
            }

            $users = $users->get();
       }
       else {
            $users = User::whereIn('user_id', $req->selected_users)->get(); // Retrieve users based on the selected IDs
       }
       
       // Data should not have duplicate in the table before inserting
       foreach($users as $user) {
            LearningMember::insert(
                [
                'program_id' => $program_id, 
                'user_id' => $user->user_id,
                'learning_member_id' => (string) Str::uuid(), 
                'updated_at' => Carbon::now(),
                'created_at' => Carbon::now(),
            ]);
       }

       return back()->with('success', 'Users added successfully.');
    } 
}
