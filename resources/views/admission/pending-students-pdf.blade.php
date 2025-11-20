<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pending Students List</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #333;
            margin: 20px;
        }

        h2 {
            text-align: center;
            font-weight: 700;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 8px;
            text-align: center;
        }

        th {
            background: #e4e4ff;
            font-weight: 600;
        }

        th:first-child, td:first-child {
            border-left: none;
        }

        th:last-child, td:last-child {
            border-right: none;
        }

        /* Footer */
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
    <h2>Pending Students List</h2>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Enrollment Status</th>
                <th>Admission Status</th>
                <th>Date Applied</th>
            </tr>
        </thead>
        <tbody>
            @forelse($students as $student)
                <tr>
                    <td>{{ $student->user ? $student->user->first_name . ' ' . $student->user->last_name : 'N/A' }}</td>
                    <td>{{ $student->user->email ?? 'N/A' }}</td>
                    <td>{{ ucfirst($student->enrollment_status ?? 'N/A') }}</td>
                    <td>{{ ucfirst($student->admission_status ?? 'N/A') }}</td>
                    <td>{{ $student->created_at ? $student->created_at->format('F d, Y') : 'N/A' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align:center;">No pending students found.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="pdf-footer">
        Generated on: {{ now()->format('F d, Y h:i A') }}
    </div>
</body>
</html>
