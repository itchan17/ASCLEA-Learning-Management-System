<x-mail::message>
<x-mail::layout>
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    # New Contact Form Submission

    You have received a new message through the contact form on your website. Here are the details:

    @component('mail::panel')
        **Name:** {{ $contact->name }}  
        **Email:** {{ $contact->email }}  
        **Date:** {{ $contact->created_at->format('F j, Y, g:i a') }}
    @endcomponent

    **Message:**  
    {{ $contact->message }}

    @component('mail::button', ['url' => route('admin.contacts.show', $contact), 'color' => 'primary'])
        View in Dashboard
    @endcomponent

    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
        @endcomponent
    @endslot
@endcomponent
