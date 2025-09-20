<?php

namespace App\Http\Controllers\PaymentHistory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\PaymentHistory\Payment;
use App\Models\PaymentHistory\PaymentFile;
use Illuminate\Support\Str;

class paymentHistoryController extends Controller
{
    public function paidStudents(Request $request)
    {
        $search = $request->input('search'); // search term from frontend

        $students = Student::where('payment', 'paid')
            ->with([
                'user:user_id,first_name,last_name,middle_name,email',
                'learningMember.program:program_id,program_name',
            ])
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $students->getCollection()->transform(function ($student) {
            return [
                'id' => $student->student_id,
                'user_id' => $student->user_id,
                'name' => $student->user->first_name . ' ' . ($student->user->last_name ?? ''),
                'email' => $student->user->email ?? 'N/A',
                'program' => $student->learningMember->program->program_name ?? 'N/A',
            ];
        });

        return Inertia::render('Accounting/PaidStudents', [
            'students' => $students,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    public function paymentHistory($userId)
    {
        $student = Student::with('user')->where('user_id', $userId)->firstOrFail();

        $payments = Payment::withTrashed()
            ->where('user_id', $userId)
            ->latest('receipt_date')
            ->paginate(10);

        // Transform the collection
        $payments->getCollection()->transform(function ($payment) {
            return [
                'payment_id'      => $payment->payment_id,
                'payment_method'  => $payment->payment_method,
                'transaction_id'  => $payment->transaction_id,
                'receipt_date'    => $payment->receipt_date,
                'payment_amount'  => $payment->payment_amount,
                'deleted_at'      => $payment->deleted_at,
            ];
        });

        return Inertia::render('Accounting/StaffAccounting/PaymentHistoryPage', [
            'student' => [
                'id'      => $student->student_id,
                'user_id' => $student->user_id,
                'name'    => $student->user->first_name . ' ' . $student->user->last_name,
                'email'   => $student->user->email,
            ],
            'PaymentList' => $payments,
        ]);
    }


    public function storePayment(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'payment_method' => 'required|string',
            'transaction_id' => 'required|string|unique:payments,transaction_id',
            'receipt_date' => 'required|date',
            'payment_amount' => 'required|integer',
            'proof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Create the payment record
        $payment = Payment::create($request->only([
            'user_id',
            'payment_method',
            'transaction_id',
            'receipt_date',
            'payment_amount'
        ]));

        // Handle file upload
        if ($request->hasFile('proof')) {
            $file = $request->file('proof');

            $path = $file->store('payments', 'public');

            PaymentFile::create([
                'payment_file_id' => Str::uuid(), 
                'payment_id'      => $payment->payment_id,
                'file_name'       => $file->getClientOriginalName(),
                'file_path'       => $path,
                'file_type'       => $file->getClientMimeType(),
                'uploaded_by'     => $request->user_id,
                'uploaded_at'     => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Payment added successfully!');
    }


    public function viewPaymentInfo($paymentId)
    {
        $payment = Payment::withTrashed() 
            ->where('payment_id', $paymentId)
            ->with(['user', 'files'])
            ->firstOrFail();

        return Inertia::render('Accounting/StaffAccounting/PaymentInfo', [
            'paymentId'       => $payment->payment_id,
            'studentId'       => $payment->user_id,
            'payment_method'  => $payment->payment_method,
            'transaction_id'  => $payment->transaction_id,
            'receipt_date'    => $payment->receipt_date,
            'payment_amount'  => $payment->payment_amount,
            'deleted_at'      => $payment->deleted_at,
            'user' => [
                'name'   => $payment->user->first_name . ' ' . ($payment->user->last_name ?? ''),
                'email'  => $payment->user->email,
                'status' => $payment->user->student->enrollment_status ?? null,
            ],
            'files' => $payment->files->map(fn($file) => [
                'id'   => $file->payment_file_id,
                'name' => $file->file_name,
                'url'  => asset('storage/' . $file->file_path),
                'type' => $file->file_type,
                'deleted_at' => $file->deleted_at,
            ]),
        ]);
    }

    public function updatePayment(Request $request, $paymentId)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'transaction_id' => 'required|string|unique:payments,transaction_id,' . $paymentId . ',payment_id',
            'receipt_date'   => 'required|date',
            'payment_amount' => 'required|integer',
            'proof'          => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $payment = Payment::findOrFail($paymentId);

        $payment->update([
            'payment_method'  => $request->payment_method,
            'transaction_id'  => $request->transaction_id,
            'receipt_date'    => $request->receipt_date,
            'payment_amount'  => $request->payment_amount,
        ]);

        if ($request->hasFile('proof')) {
            PaymentFile::where('payment_id', $payment->payment_id)->delete();

            $file = $request->file('proof');
            $path = $file->store('payments', 'public');

            PaymentFile::create([
                'payment_file_id' => \Illuminate\Support\Str::uuid(),
                'payment_id'      => $payment->payment_id,
                'file_name'       => $file->getClientOriginalName(),
                'file_path'       => $path,
                'file_type'       => $file->getClientMimeType(),
                'uploaded_by'     => $request->user_id ?? auth()->id(),
                'uploaded_at'     => now(),
            ]);
        }
        

        return redirect()->back()->with('success', 'Payment updated successfully!');
    }

    public function viewPaymentFile($paymentId, $fileId)
    {
        $file = PaymentFile::where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        return Inertia::render('Accounting/StaffAccounting/ViewPaymentFile', [
            'fileName'  => $file->file_name,
            'paymentId' => $paymentId,
            'fileId'    => $fileId,
            'fileUrl'   => route('paymenthistory.payment.file.stream', [
                'paymentId' => $paymentId,
                'fileId'    => $fileId,
            ]),
        ]);
    }

    public function streamPaymentFile($paymentId, $fileId)
    {
        $file = PaymentFile::where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        // Equivalent of HandlingPrivateFileService::retrieveFile()
        return response()->file(storage_path("app/public/{$file->file_path}"));
    }

    public function downloadPaymentFile($paymentId, $fileId)
    {
        $file = PaymentFile::where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        // Equivalent of HandlingPrivateFileService::downloadFile()
        return response()->download(
            storage_path("app/public/{$file->file_path}"),
            $file->file_name
        );
    }

    public function restoreFile($paymentId, $fileId)
    {
        // Restore the soft-deleted file
        $file = PaymentFile::withTrashed()
            ->where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        // Soft delete any currently active file for this payment (so only one stays active)
        PaymentFile::where('payment_id', $paymentId)
            ->whereNull('deleted_at')
            ->update(['deleted_at' => now()]);

        $file->restore();

        return redirect()
            ->route('paymenthistory.paymentInfo.view', $paymentId)
            ->with('success', 'File reverted successfully!');

    }

    public function archivePayment($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        $payment->delete(); // Soft delete the payment

        return redirect()
            ->route('paymenthistory.payment.history', $payment->user_id)
            ->with('success', 'Payment archived successfully!');
    }

    public function restorePayment($paymentId)
    {
        $payment = Payment::withTrashed()->findOrFail($paymentId);

        if ($payment->trashed()) {
            $payment->restore();
        }

        return redirect()
            ->route('paymenthistory.payment.history', $payment->user_id)
            ->with('success', 'Payment restored successfully!');
    }

    // ---------------- Student methods ----------------
    public function studentPaymentHistory()
    {
        $userId = auth()->id(); // logged-in user's UUID

        $payments = Payment::where('user_id', $userId)->get();

        return Inertia::render('Accounting/StudentPayment/StudentPaymentHistoryPage', [
            'payments' => $payments,
        ]);
    }


    public function viewStudentPaymentInfo($paymentId)
    {
        $payment = Payment::where('payment_id', $paymentId)
            ->where('user_id', auth()->id()) // ensure only their payment
            ->with(['user', 'files'])
            ->firstOrFail();

        return Inertia::render('Accounting/StudentPayment/StudentPaymentInfo', [
            'paymentId'       => $payment->payment_id,
            'studentId'       => $payment->user_id,
            'payment_method'  => $payment->payment_method,
            'transaction_id'  => $payment->transaction_id,
            'receipt_date'    => $payment->receipt_date,
            'payment_amount'  => $payment->payment_amount,
            'deleted_at'      => $payment->deleted_at,
            'user' => [
                'name'   => $payment->user->first_name . ' ' . ($payment->user->last_name ?? ''),
                'email'  => $payment->user->email,
                'status' => $payment->user->student->enrollment_status ?? null,
            ],
            'files' => $payment->files->map(fn($file) => [
                'id'        => $file->payment_file_id,
                'name'      => $file->file_name,
                'url'       => asset('storage/' . $file->file_path),
                'type'      => $file->file_type,
                'deleted_at'=> $file->deleted_at,
            ]),
        ]);
    }

    public function viewStudentPaymentFile($paymentId, $fileId)
    {
        $payment = Payment::where('payment_id', $paymentId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $file = PaymentFile::where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        return Inertia::render('Accounting/StudentPayment/StudentDocumentViewerPayment', [
            'fileName'  => $file->file_name,
            'paymentId' => $paymentId,
            'fileId'    => $fileId,
            'fileUrl'   => route('paymenthistory.student.payment.file.stream', [
                'paymentId' => $paymentId,
                'fileId'    => $fileId,
            ]),
        ]);
    }

    public function streamStudentPaymentFile($paymentId, $fileId)
    {
        $payment = Payment::where('payment_id', $paymentId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $file = PaymentFile::where('payment_id', $paymentId)
            ->where('payment_file_id', $fileId)
            ->firstOrFail();

        return response()->file(storage_path("app/public/{$file->file_path}"));
    }

}
