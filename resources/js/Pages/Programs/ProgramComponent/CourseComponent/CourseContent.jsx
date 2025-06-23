import React from "react";
import Tabs from "../../../../Components/Tabs/Tabs";
import BackButton from "../../../../Components/Button/BackButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import Home from "./CourseContentTab/Home";
import Materials from "./CourseContentTab/Materials";
import Assessments from "./CourseContentTab/Assessments";
import { handleClickBackBtn } from "../../../../Utils/handleClickBackBtn";

export default function CourseContent() {
    // Course Store
    const activeTab = useCourseStore((state) => state.activeTab);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    // Tab list
    const tabs = ["Home", "Modules", "Assessments", "Grades"];
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
        </div>
    );
}
