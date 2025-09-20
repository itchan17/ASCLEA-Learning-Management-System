<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentHistory\paymentHistoryController;

Route::prefix('payment-history')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {   
        // Initial accounting page (list of students)
        Route::get('/', [paymentHistoryController::class, 'paidStudents'])
            ->name('paymenthistory.index');

        // Payment history of a specific student
        Route::get('/payment-history/{userId}', [paymentHistoryController::class, 'paymentHistory'])
            ->name('paymenthistory.payment.history');

        Route::post('/payments', [paymentHistoryController::class, 'storePayment'])
            ->name('paymenthistory.payment.store');

        Route::get('/payment-info/{paymentId}', [paymentHistoryController::class, 'viewPaymentInfo'])
            ->name('paymenthistory.paymentInfo.view');
        
        Route::put('/payments-info/{paymentId}', [paymentHistoryController::class, 'updatePayment'])
            ->name('paymenthistory.payment.update');

        Route::delete('/payment-info/{paymentId}', [paymentHistoryController::class, 'archivePayment'])
            ->name('paymenthistory.payment.archive');

        Route::patch('/payment-info/{paymentId}', [paymentHistoryController::class, 'restorePayment'])
            ->name('paymenthistory.payment.restore');

        Route::get('/payment-info/{paymentId}/files/{fileId}', [paymentHistoryController::class, 'viewPaymentFile'])
            ->name('paymenthistory.payment.file.view');

        Route::get('/payment-info/{paymentId}/files/{fileId}/stream', [paymentHistoryController::class, 'streamPaymentFile'])
            ->name('paymenthistory.payment.file.stream');

        Route::get('/payment-info/{paymentId}/files/{fileId}/download', [paymentHistoryController::class, 'downloadPaymentFile'])
            ->name('paymenthistory.payment.file.download');

        Route::put('/payment-info/{paymentId}/files/{fileId}/restore', [paymentHistoryController::class, 'restoreFile'])
            ->name('paymenthistory.payment.file.restore');

    });

    Route::prefix('student-payment-history')
        ->middleware(['auth', 'verified', 'preventBack', 'checkRole:student'])
        ->group(function () {
            // Directly show logged-in student’s history
            Route::get('/', [paymentHistoryController::class, 'studentPaymentHistory'])
                ->name('paymenthistory.student.history');

            Route::get('/payment-info/{paymentId}', [paymentHistoryController::class, 'viewStudentPaymentInfo'])
                ->name('paymenthistory.student.paymentInfo.view');

            Route::get('/payment-info/{paymentId}/files/{fileId}', [paymentHistoryController::class, 'viewStudentPaymentFile'])
                ->name('paymenthistory.student.payment.file.view');

            Route::get('/payment-info/{paymentId}/files/{fileId}/stream', [paymentHistoryController::class, 'streamStudentPaymentFile'])
                ->name('paymenthistory.student.payment.file.stream');
        });







