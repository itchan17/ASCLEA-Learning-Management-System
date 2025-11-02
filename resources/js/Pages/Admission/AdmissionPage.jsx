import { usePage } from "@inertiajs/react";
import Tabs from "../../Components/Tabs/Tabs";
import PendingPage from "./PendingPage/PendingPage";
import EnrolledPage from "./EnrolledPage/EnrolledPage";
import useActiveTabStore from "../../Stores/Admission/ActiveTabStore";
import useUserStore from "../../Stores/User/userStore";
import UnapprovedStudentAdmission from "./UnapprovedStudent/UnapprovedStudentAdmission";

const AdmissionPage = () => {
    const user = useUserStore((state) => state.user);
    const { activeTab, setActiveTab } = useActiveTabStore();

    // Inertia-provided props
    const { pendingStudents, enrolledStudents } = usePage().props;

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

                    {activeTab === 0 && <PendingPage pendingStudents={pendingStudents} />}
                    {activeTab === 1 && <EnrolledPage enrolledStudents={enrolledStudents} />}
                </div>
            ) : (
                <UnapprovedStudentAdmission />
            )}
        </>
    );
};

export default AdmissionPage;
