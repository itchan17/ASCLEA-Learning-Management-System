<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AccountingController;

Route::prefix('accounting')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        // Route for Accounting main page (Paid Students table)
        Route::get('/', [AccountingController::class, 'paidStudents'])
            ->name('accounting.paid.students');

        // Route for Viewing Payment History of Student
        Route::get('/paymenthistory/{studentId}', function ($studentId) {
            return Inertia::render('Accounting/StaffAccounting/PaymentHistoryPage', [
                'studentId' => $studentId,
            ]);
        })->name('accounting.student.view');

        // Route for Viewing Payment Information
        Route::get('/paymentinfo/{paymentId}/{studentId}', function ($paymentId, $studentId) {
            return Inertia::render('Accounting/StaffAccounting/PaymentInfo', [
                'paymentId' => $paymentId,
                'studentId' => $studentId,
            ]);
        })->name('accounting.payment.view');
});