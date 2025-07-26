import React from "react";
import Tabs from "../../../../Components/Tabs/Tabs";
import BackButton from "../../../../Components/Button/BackButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import Home from "./CourseContentTab/Home";
import Materials from "./CourseContentTab/Materials";
import Assessments from "./CourseContentTab/Assessments";
import Grades from "./CourseContentTab/Grades";
import { handleClickBackBtn } from "../../../../Utils/handleClickBackBtn";
import useUserStore from "../../../../Stores/User/userStore";

export default function CourseContent() {
    // User store
    const user = useUserStore((state) => state.user);

    // Course Store
    const activeTab = useCourseStore((state) => state.activeTab);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    // Tab list
    const tabs = [
        "Home",
        "Modules",
        "Assessments",
        user?.role === "admin" || user?.role === "faculty" ? "Grades" : null,
    ];

    console.log(tabs);
    return (
        <div className="space-y-5">
            <Tabs
                activeTab={activeTab}
                doSomething={setActiveTab}
                tabList={tabs}
            />
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>

            {activeTab === 0 && <Home />}
            {activeTab === 1 && <Materials />}
            {activeTab === 2 && <Assessments />}
            {activeTab === 3 && <Grades />}
        </div>
    );
}
