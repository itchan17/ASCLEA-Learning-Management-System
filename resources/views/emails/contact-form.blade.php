<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            background-color: #1a365d;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
            <p>You have received a new message from the contact form on your website:</p>
            
            <table cellpadding="10" cellspacing="0" width="100%">
                <tr>
                    <td style="width: 100px;"><strong>Name:</strong></td>
                    <td>{{ $formData['name'] }}</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td><a href="mailto:{{ $formData['email'] }}">{{ $formData['email'] }}</a></td>
                </tr>
                <tr>
                    <td><strong>Message:</strong></td>
                    <td style="white-space: pre-line;">{{ $formData['message'] }}</td>
                </tr>
            </table>
            
            <div class="footer">
                <p>This email was sent from the contact form on {{ config('app.name') }}.</p>
            </div>
        </div>
    </div>
</body>
</html>
