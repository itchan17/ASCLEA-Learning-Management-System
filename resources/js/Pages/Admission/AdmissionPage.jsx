import { useState } from "react";
import Tabs from "../../Components/Tabs/Tabs";
import PendingPage from "./PendingPage/PendingPage";
import EnrolledPage from "./EnrolledPage/EnrolledPage";
import useActiveTabStore from "../../Stores/Admission/ActiveTabStore";
import useUserStore from "../../Stores/User/userStore";
import UnapprovedStudentAdmission from "./UnapprovedStudent/UnapprovedStudentAdmission";

const AdmissionPage = () => {
    // User store
    const user = useUserStore((state) => state.user);

    const { activeTab, setActiveTab } = useActiveTabStore();
    const tabs = ["Pending", "Enrolled Students"];

    return (
        <>
            {user && user?.role === "admin" ? (
                <div className="space-y-5">
                    <Tabs
                        activeTab={activeTab}
                        doSomething={setActiveTab}
                        tabList={tabs}
                    />

                    {activeTab === 0 && <PendingPage />}
                    {activeTab === 1 && <EnrolledPage />}
                </div>
            ) : (
                <UnapprovedStudentAdmission />
            )}
        </>
    );
};

export default AdmissionPage;
