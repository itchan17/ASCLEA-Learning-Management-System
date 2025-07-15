import { useState } from "react";
import Tabs from "../../Components/Tabs/Tabs";
import ArchivedCourses from "./ArchiveComponents/ArchivedCourses";
import ArchivedStudents from "./ArchiveComponents/ArchivedStudents";
import ArchivedStaff from "./ArchiveComponents/ArchivedStaff";

export default function Archives() {
    const [activeTab, setActiveTab] = useState(0);
    // Tab list
    const tabs = ["Courses", "Students", "Administration"];
    return (
        <div className="space-y-5">
            <Tabs
                activeTab={activeTab}
                doSomething={setActiveTab}
                tabList={tabs}
            />

            {activeTab === 0 && <ArchivedCourses />}
            {activeTab === 1 && <ArchivedStudents />}
            {activeTab === 2 && <ArchivedStaff />}
        </div>
    );
}
