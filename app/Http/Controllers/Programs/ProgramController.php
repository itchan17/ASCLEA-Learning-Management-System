<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Program;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProgramController extends Controller
{
    // Display the program page
    public function show() {
        $programList = Program::select('program_id', 'program_name', 'program_description')->latest()->get();

        return Inertia::render('Programs/Programs', [
            'program_list' => $programList
        ]);
    }

    public function store(Request $req) {
        // Throw an error if try to access by unauthorized user
        Gate::authorize('create', Program::class);

        // Validate input
        $validated = $req->validate([
            'program_name' => 'required|unique:programs,program_name|max:255',
            'program_description' => 'string|nullable',
        ]);

        // Create program
        $program = Program::create($validated);
   
        // Return a flash success 
        return back()->with('success', 'Program created successfully.');
    }

    // Handle updating the program details
    public function update(Request $req, Program $program) {
        
        // Throw an error if try to access by unauthorized user
        Gate::authorize('update', Program::class);

        $validated = $req->validate([
            'program_name'  => [
                'required',
                'max:255',
                Rule::unique('programs')->ignore($program->program_id, 'program_id'), // Ignore unique validation for current program that is updating
            ],
            'program_description' => 'string|nullable',
        ]);

        $program->update($validated);
        
        // Return a flash success 
        return back()->with('success', 'Program updated successfully.');
    }

    // Handle archiving program through soft delete
    public function archive(Program $program) {
        // Throw an error if try to access by unauthorized user
        Gate::authorize('delete', Program::class);

        $programToArchive = Program::find($program->program_id);  
        $programToArchive->delete(); 

        return back()->with('success', 'Program archived successfully.');
    }
}
