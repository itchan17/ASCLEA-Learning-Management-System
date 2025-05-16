import { useState } from "react";
import Courses from "./Courses";
import People from "./People";
import Tabs from "../../../Components/Tabs/Tabs";

export default function ProgramContent() {
    const [activeTab, setActiveTab] = useState(0);

    // Tab list
    const tabs = ["Courses", "People"];

    const handleCLickTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="space-y-5">
            <Tabs
                activeTab={activeTab}
                doSomething={handleCLickTab}
                tabList={tabs}
            />

            {activeTab === 0 && <Courses />}
            {activeTab === 1 && <People />}
        </div>
    );
}
