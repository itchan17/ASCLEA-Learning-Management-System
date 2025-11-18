<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public string $email;
    public string $messageContent;

    /**
     * Create a new message instance.
     */
    public function __construct(string $name, string $email, string $messageContent)
    {
        $this->name = $name;
        $this->email = $email;
        $this->messageContent = $messageContent;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('New Contact Request')
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->replyTo($this->email, $this->name)
            ->view('emails.contact_message');
    }
}