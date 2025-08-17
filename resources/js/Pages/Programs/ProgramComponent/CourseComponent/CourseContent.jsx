import { useState } from "react";
import Tabs from "../../../../Components/Tabs/Tabs";
import BackButton from "../../../../Components/Button/BackButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import Home from "./CourseContentTab/Home";
import Materials from "./CourseContentTab/Materials";
import Assessments from "./CourseContentTab/Assessments";
import Grades from "./CourseContentTab/Grades";
import { handleClickBackBtn } from "../../../../Utils/handleClickBackBtn";
import useUserStore from "../../../../Stores/User/userStore";
import { route } from "ziggy-js";
import { router, usePage } from "@inertiajs/react";

export default function CourseContent() {
    const { course, program } = usePage().props;

    // User store
    const user = useUserStore((state) => state.user);

    // Course Store
    const activeTab = useCourseStore((state) => state.activeTab);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    const [isLoading, setIsLoading] = useState(false);

    // Tab list
    const tabs = [
        { name: "Home", onlyData: [] },
        { name: "Modules", onlyData: [] },
        { name: "Assessments", onlyData: ["assessments"] },
        {
            name: `${user?.role !== "student" ? "Grades" : null}`,
            onlyData: [],
        },
    ];

    const handleClickTab = (tabIndex, onlyData) => {
        setActiveTab(tabIndex);
        setIsLoading(true);
        router.get(
            route("program.course.show", {
                program: program.program_id,
                course: course.course_id,
            }),
            {},
            {
                only: onlyData,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    console.log(tabs);
    return (
        <div className="space-y-5">
            <div className="h-12 -mt-2 sm:-mt-5 border-b border-ascend-gray1 w-full py-1 flex sm:justify-center items-center overflow-x-auto space-x-1 font-nunito-sans text-ascend-black">
                {tabs.map((tab, index) =>
                    tab ? (
                        <div
                            key={index}
                            onClick={() => handleClickTab(index, tab.onlyData)}
                            className={`py-1.5 px-8 cursor-pointer font-bold hover:bg-ascend-lightblue  transition-all duration-300 ${
                                activeTab === index &&
                                "bg-ascend-lightblue text-ascend-blue"
                            }`}
                        >
                            <span>{tab.name}</span>
                        </div>
                    ) : null
                )}
            </div>

            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>

            {/* isloading prevents component to render while navigation is still loading */}
            {!isLoading && activeTab === 0 && <Home />}
            {!isLoading && activeTab === 1 && <Materials />}
            {!isLoading && activeTab === 2 && <Assessments />}
            {!isLoading && activeTab === 3 && <Grades />}
        </div>
    );
}
