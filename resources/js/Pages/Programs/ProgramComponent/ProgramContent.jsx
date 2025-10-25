import { useState } from "react";
import Courses from "./Courses";
import People from "./People";
import Tabs from "../../../Components/Tabs/Tabs";
import useProgramStore from "../../../Stores/Programs/programStore";

export default function ProgramContent() {
    // Program Store
    const activeTab = useProgramStore((state) => state.activeTab);
    const setActiveTab = useProgramStore((state) => state.setActiveTab);

    // Tab list
    const tabs = ["Courses", "People"];

    return (
        <div className="space-y-5">
            <Tabs
                activeTab={activeTab}
                doSomething={setActiveTab}
                tabList={tabs}
            />

            {activeTab === 0 && <Courses />}
            {activeTab === 1 && <People />}
        </div>
    );
}
