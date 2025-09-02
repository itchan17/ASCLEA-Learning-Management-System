<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AccountingController;

// Group for payment history (student only)
Route::prefix('payment-history')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:student'])
    ->group(function () {
        // Route for Payment History Student Page
        Route::get('/', function () {
            return Inertia::render('Accounting/PaymentHistoryStudentPage');
        });

        // Route for Viewing a Specific Payment Info
        Route::get('/{paymentId}', function ($paymentId) {
            return Inertia::render('Accounting/StudentPaymentHistory/StudentPaymentInfo', [
                'paymentId' => $paymentId,
            ]);
        })->name('accounting.paymentInfo.view');
    });


Route::get('/accounting/paid-students', [AccountingController::class, 'paidStudents'])
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin']) 
    ->name('accounting.paid.students');
