<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Program;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProgramController extends Controller
{
    // Display the program page
    public function show() {
        $programList = Program::select('program_id', 'program_name', 'program_description')->get();

        return Inertia::render('Programs/Programs', [
            'program_list' => $programList
        ]);
    }

    public function store(Request $req) {
        // Throw an error if try to access by unauthorized user
        Gate::authorize('create', Program::class);

        // dd($req->all());
        // Validate input
        $validated = $req->validate([
            'program_name' => 'required|max:255',
            'program_description' => 'string|nullable',
        ]);

        // Create program
        $program = Program::create($validated);
   
        // Return a flash success containing message and the data of program created
        return to_route('programs.index')->with('success', [
            'message' => 'Program created successfully.',
            'data' => $program,
        ]);
    }

}
