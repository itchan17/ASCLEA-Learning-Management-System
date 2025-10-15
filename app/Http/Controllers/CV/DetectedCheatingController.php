<?php

namespace App\Http\Controllers\CV;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CV\DetectedCheating;
use App\Models\Programs\AssessmentSubmission;
use App\Models\CV\DetectedCheatingFile;

class DetectedCheatingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'assessment_submission_id' => 'required|uuid|exists:assessment_submissions,assessment_submission_id',
            'message' => 'required|string|max:255',
            'file_name' => 'required|string|max:255',
            'file_path' => 'required|string|max:1024',
            'file_type' => 'required|string|max:50',
        ]);


        $cheating = DetectedCheating::create([
            'assessment_submission_id' => $validated['assessment_submission_id'],
            'message' => $validated['message'],
        ]);

        DetectedCheatingFile::create([
            'detected_cheating_id' => $cheating->cheating_id,
            'file_name' => $validated['file_name'],
            'file_path' => $validated['file_path'],
            'file_type' => $validated['file_type'],
            'uploaded_at' => now(),
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'cheating_id' => $cheating->cheating_id,
            ]);
        }

        return back()->with('success', 'Cheating log recorded successfully.');
    }

}

