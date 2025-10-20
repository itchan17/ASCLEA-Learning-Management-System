<!DOCTYPE html>
<html>
<head>
    <title>Payment History</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif; /* Built-in font */
        }

        h2, h3 {
            text-align: center;
            font-weight: bold;
            margin: 5px 0;
        }

        .logo {
            text-align: center;
            margin-bottom: 10px;
        }

        .logo img {
            height: 70px; /* adjust as needed */
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th, td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 8px;
            text-align: center;
        }

        th {
            background: #e4e4ff;
            font-weight: bold;
        }

        th:first-child, td:first-child {
            border-left: none;
        }
        th:last-child, td:last-child {
            border-right: none;
        }

        .pdf-footer {
            position: fixed;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 11px;
            color: #555;
        }
    </style>
</head>
<body>

    <!-- Student Name -->
    <h3>
        Student: 
        {{ $payments->first()->user->first_name ?? '' }} {{ $payments->first()->user->last_name ?? '' }}
    </h3>

    <h2>Payment History</h2>

    <table>
        <thead>
            <tr>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Receipt Date</th>
                <th>Payment Amount</th>
                <th>Paid By</th>
            </tr>
        </thead>
        <tbody>
            @foreach($payments as $payment)
                <tr>
                    <td>{{ $payment->payment_method }}</td>
                    <td>{{ $payment->transaction_id }}</td>
                    <td>{{ $payment->receipt_date }}</td>
                    <td>{{ number_format($payment->payment_amount, 2) }}</td>
                    <td>
                        {{ $payment->user ? $payment->user->first_name . ' ' . $payment->user->last_name : 'N/A' }}
                        ({{ $payment->user->role->role_name ?? 'N/A' }})
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="pdf-footer">
        Generated on: {{ now()->format('F d, Y h:i A') }}
    </div>

</body>
</html>
