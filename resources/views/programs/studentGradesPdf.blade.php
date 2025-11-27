<!DOCTYPE html>
<html>

<head>
    <title>Student Grades</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            /* Built-in font */
        }

        h1 {
            text-align: center;
        }

        h2,
        h3 {
            font-weight: 500;

        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 8px;
            text-align: center;
            /* Centers table content */
        }

        th {
            background: #e4e4ff;
            font-weight: 600;
        }

        /* Remove vertical borders */
        th:first-child,
        td:first-child {
            border-left: none;
        }

        th:last-child,
        td:last-child {
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
    <h1>{{$program->program_name}} Grades</h1>
    <table>
        <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Status</th>
                <th>Email</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $student)
            <tr>
                <td>{{ $student->last_name ?? 'N/A'}}</td>
                <td>{{ $student->first_name ?? 'N/A'}}</td>
                <td>{{ $student->grade->status ?? 'no grade' }}</td>
                <td>{{ $student->email ?? 'N/A' }}</td>
                <td>{{ $student->grade->grade ?? '' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <!-- Footer -->
    <div class="pdf-footer">
        Generated on: {{ now()->format('F d, Y h:i A') }}
    </div>
</body>

</html>