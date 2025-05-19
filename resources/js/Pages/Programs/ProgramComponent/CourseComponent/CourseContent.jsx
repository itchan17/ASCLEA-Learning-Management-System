import React from "react";
import Tabs from "../../../../Components/Tabs/Tabs";
import BackButton from "../../../../Components/Button/BackButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import Home from "./CourseContentTab/Home";
import { router } from "@inertiajs/react";

export default function CourseContent() {
    // Course Store
    const activeTab = useCourseStore((state) => state.activeTab);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    const handleClickBackBtn = () => {
        router.visit(`/programs/${1}`);
    };

    // Tab list
    const tabs = ["Home", "Materials", "Assessments", "Grades"];
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
        </div>
    );
}
