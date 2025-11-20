import { useState } from "react";
import { usePage } from "@inertiajs/react";
import StudentDashboard from "./Student/StudentDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import FacultyDashboard from "./Faculty/FacultyDashboard";
import useUserStore from "../../Stores/User/userStore";

export default function Dashboard() {
    const [isStudent, setIsStudent] = useState(false);
    const user = useUserStore((state) => state.user);
    const { 
        authUser, 
        stats, 
        studentsPerProgram, 
        dailyLogins, 
        avgTimePerDay, 
        total_learning_hours,
        totalTimeSpent, 
        total_assigned_courses, 
        dailyTimeSpent, 
        total_submitted_assessments, 
        average_quiz_score, 
        assessments,
        courseImprovementRates } = usePage().props;
    const role = authUser?.role;

    console.log("Render Dashboard");

    return (
        <div className="w-full space-y-5 font-nunito-sans text-ascend-black">
            <div className="h-16 lg:h-20 bg-ascend-yellow sm:[clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)]">
                <div className="h-16 lg:h-20 bg-ascend-blue mr-5 sm:mr-15 flex items-center p-5 sm:[clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)]">
                    <p className="text-ascend-white text-size5 lg:text-size7">
                        <span>Welcome </span>
                        <span className="font-bold">{authUser?.first_name || "User"}</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className="text-size6 font-bold">Analytics Overview</h1>
            </div>

            {role === "student" ? (
                <StudentDashboard 
                    total_learning_hours={total_learning_hours} 
                    total_assigned_courses={total_assigned_courses} 
                    dailyTimeSpent={dailyTimeSpent} 
                    total_submitted_assessments={total_submitted_assessments} 
                    average_quiz_score={average_quiz_score}
                    courseImprovementRates={courseImprovementRates}/>
            ) : role === "admin" ? (
                <AdminDashboard 
                    stats={stats} 
                    studentsPerProgram={studentsPerProgram} 
                    dailyLogins={dailyLogins} 
                    avgTimePerDay={avgTimePerDay} />
            ) : (
                <FacultyDashboard 
                    stats={stats}
                    totalTimeSpent={totalTimeSpent} 
                    dailyLogins={dailyLogins} 
                    avgTimePerDay={avgTimePerDay}
                    assessments={assessments}/>
            )}
        </div>
    );
}
