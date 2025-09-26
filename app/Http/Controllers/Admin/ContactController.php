<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts.
     */
    public function index(Request $request)
    {
        $query = Contact::latest();

        // Filter by status if provided
        if ($request->has('status') && in_array($request->status, ['new', 'read', 'replied', 'closed'])) {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $contacts = $query->paginate(15);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'filters' => [
                'status' => $request->status ?? '',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Display the specified contact.
     */
    public function show(Contact $contact)
    {
        // Mark as read when viewing
        if ($contact->status === 'new') {
            $contact->update(['status' => 'read']);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact->load('replies'),
        ]);
    }

    /**
     * Update the contact status.
     */
    public function updateStatus(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,replied,closed',
        ]);

        $contact->update(['status' => $validated['status']]);

        return back()->with('success', 'Status updated successfully.');
    }

    /**
     * Remove the specified contact from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()
            ->route('admin.contacts.index')
            ->with('success', 'Contact message deleted successfully.');
    }

    /**
     * Bulk delete contacts.
     */
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:contacts,id',
        ]);

        Contact::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Selected contacts have been deleted.');
    }
}
