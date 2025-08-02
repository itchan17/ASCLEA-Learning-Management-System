<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function listUsers(Program $program) {
        $programId = $program->program_id;
        $roleId = Role::where('role_name', 'admin')->value('role_id');

        // Get users that is not an admin and not a member of the program
        $users = User::with('role')->select('user_id', 'first_name', 'last_name', 'email', 'role_id')->where('role_id', '!=', $roleId)->whereNotIn('user_id', function ($query) use ($programId) {
            $query->select('user_id')
                ->from('learning_members')
                ->where('program_id', $programId);
        })->orderBy('created_at', 'desc')->orderBy('user_id', 'desc')->paginate(10);

        return response()->json($users);
    }
}
