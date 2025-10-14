<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentHistory\paymentHistoryController;

Route::prefix('payment-history')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Admin: list of paid students
        Route::get('/', [paymentHistoryController::class, 'paidStudents'])
            ->name('paymenthistory.index');

        // Payment history for any user (admin or student)
        Route::get('/{userId}', [paymentHistoryController::class, 'paymentHistory'])
            ->name('paymenthistory.payment.history');

        // Other payment-related routes (store, update, archive, files...)
        Route::post('/payments', [paymentHistoryController::class, 'storePayment'])
            ->name('paymenthistory.payment.store');

        Route::get('/payments/{userId}/export-csv', [paymentHistoryController::class, 'exportCsv'])
            ->name('paymenthistory.export.csv');

        Route::get('/payments/{userId}/export-pdf', [paymentHistoryController::class, 'exportPdf'])
            ->name('paymenthistory.export.pdf');

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
        ->middleware(['auth', 'verified', 'preventBack'])
        ->group(function () {
            Route::get('/', function() {
                return redirect()->route('paymenthistory.payment.history', auth()->id());
            })->name('student.paymenthistory.me');

            Route::get('/payment-info/{paymentId}', [paymentHistoryController::class, 'viewStudentPaymentInfo'])
                ->name('student.paymenthistory.paymentInfo.view');

            Route::get('/payment-info/{paymentId}/files/{fileId}', [paymentHistoryController::class, 'viewStudentPaymentFile'])
                ->name('student.paymenthistory.payment.file.view');

            Route::get('/payment-info/{paymentId}/files/{fileId}/stream', [paymentHistoryController::class, 'streamStudentPaymentFile'])
                ->name('student.paymenthistory.payment.file.stream');
        });


    








