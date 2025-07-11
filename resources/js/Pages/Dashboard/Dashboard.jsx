import { useState } from "react";
import StudentDashboard from "./Student/StudentDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import FacultyDashboard from "./Faculty/FacultyDashboard";
import useUserStore from "../../Stores/User/userStore";

export default function Dashboard() {
    const [isStudent, setIsStudent] = useState(false);
    const user = useUserStore((state) => state.user);

    console.log("Render Dashboard");
    return (
        <div className="w-full space-y-5 font-nunito-sans text-ascend-black">
            <div className="h-16 lg:h-20 bg-ascend-yellow sm:[clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)]">
                <div className="h-16 lg:h-20 bg-ascend-blue mr-5 sm:mr-15 flex items-center p-5 sm:[clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)]">
                    <p className="text-ascend-white text-size5 lg:text-size7">
                        <span>Welcome </span>
                        <span className="font-bold">John</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className="text-size6 font-bold">Analytics Overview</h1>
            </div>

            {user && user?.role === "student" ? (
                <StudentDashboard />
            ) : user?.role === "admin" ? (
                <AdminDashboard />
            ) : (
                <FacultyDashboard />
            )}
        </div>
    );
}
