<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('programs')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student'])
    ->group(function () {

       

        // Route for selected course in the program
        Route::get('/{programId}/course/{courseId}', function ($programId, $courseId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContent', [
                'programId' => $programId,
                'courseId' => $courseId,
            ]);
        })->name('program.course.view');

        // Route for viewing material
        Route::get('/{programId}/course/{courseId}/material/{materialId}', function ($programId, $courseId, $materialId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewMaterial', [
                'programId' => $programId,
                'courseId' => $courseId,
                'materialId' => $materialId,
            ]);
        })->name('program.course.material.view');

        // Route for viewing file
        Route::get('/{programId}/course/{courseId}/file/{fileId}', function ($programId, $courseId, $fileId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewFile', [
                'programId' => $programId,
                'courseId' => $courseId,
                'fileId' => $fileId,
            ]);
        })->name('program.course.file.view');

        // Route for viewing assessment
        Route::get('/{programId}/course/{courseId}/assessment/{assessmentId}', function ($programId, $courseId, $assessmentId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment', [
                'programId' => $programId,
                'courseId' => $courseId,
                'assessmentId' => $assessmentId,
            ]);
        })->name('program.course.assessment.view');  
});

Route::prefix('programs')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty'])
    ->group(function () {

        // Route for editing quiz form
        Route::get('/{programId}/course/{courseId}/quiz-form/{quizFormId}/edit', function ($programId, $courseId, $quizFormId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm', [
                'programId' => $programId,
                'courseId' => $courseId,
                'quizFormId' => $quizFormId,
            ]);
        })->name('program.course.quiz-form.edit');

          // Route for viewing assessment responses
        Route::get('/{programId}/course/{courseId}/assessment/{assessmentId}/responses', function ($programId, $courseId, $assessmentId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewResponses', [
                'programId' => $programId,
                'courseId' => $courseId,
                'assessmentId' => $assessmentId,
            ]);
        })->name('program.course.assessment.responses');

         // Route for selected user in the program
        Route::get('/{programId}/user/{userId}', function ($programId, $userId) {
            return Inertia::render('Programs/ProgramComponent/PeopleComponent/ViewUser', [
                'programId' => $programId,
                'userId' => $userId,
            ]);
        })->name('program.user.view');
});

       