<!DOCTYPE html>
<html>
<head>
    <title>Staff List</title>
    <style>
        /* Import Nunito Sans from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');

        body {
            font-family: 'Nunito Sans', sans-serif;
        }

        h2 {
            text-align: center;
            font-weight: 700;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 8px;
            text-align: center; /* Centers table content */
        }

        th {
            background: #e4e4ff;
            font-weight: 600;
        }

        /* Remove vertical borders */
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
    <h2>Staff List</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($staffs as $staff)
                <tr>
                    <td>{{ $staff->user ? $staff->user->first_name . ' ' . $staff->user->last_name : 'N/A' }}</td>
                    <td>{{ $staff->user->email ?? 'N/A' }}</td>
                    <td>{{ $staff->user->role->role_name ? ucfirst($staff->user->role->role_name) : 'N/A' }}</td>
                    <td>{{ $staff->status ? ucfirst($staff->status) : 'N/A' }}</td>
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
