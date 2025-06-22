import { useState } from "react";
import Tabs from "../../Components/Tabs/Tabs";
import PendingPage from "./PendingPage/PendingPage";
import EnrolledPage from "./EnrolledPage/EnrolledPage";
import useActiveTabStore from "../../Stores/Admission/ActiveTabStore";

const AdmissionPage = () => {

    const { activeTab, setActiveTab } = useActiveTabStore();
    const tabs = ["Pending", "Enrolled Students"];

  return (
    <div className="space-y-5">
        <Tabs
        activeTab={activeTab}
        doSomething={setActiveTab}
        tabList={tabs}
        />  

        {activeTab === 0 && <PendingPage />}
        {activeTab === 1 && <EnrolledPage />}
    </div>

  )
}

export default AdmissionPage;
