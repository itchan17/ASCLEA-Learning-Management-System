import { useState } from "react";
import Courses from "./Courses";
import People from "./People";
import Tabs from "../../../Components/Tabs/Tabs";
import useProgramStore from "../../../Stores/Programs/programStore";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";

export default function ProgramContent() {
    // Program Store
    const activeTab = useProgramStore((state) => state.activeTab);
    const setActiveTab = useProgramStore((state) => state.setActiveTab);

    // Tab list containing the name and the only data to fetch when rendered
    const tabs = [
        { name: "Courses", onlyData: ["courses", "program"] },
        { name: "People", onlyData: ["members"] },
    ];

    const [isLoading, setIsLoading] = useState(false);

    const { program_id: programId } = usePage().props.program;

    const clickTab = (tabIndex, onlyData) => {
        setActiveTab(tabIndex);
        setIsLoading(true);
        router.get(
            route("program.show", { program: programId }),
            {},
            {
                only: onlyData,
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <div className="space-y-5">
            <div className="h-12 -mt-2 sm:-mt-5 border-b border-ascend-gray1 w-full py-1 flex sm:justify-center items-center overflow-x-auto space-x-1 font-nunito-sans text-ascend-black">
                {tabs.map((tab, index) =>
                    tab ? (
                        <div
                            key={index}
                            onClick={() => clickTab(index, tab.onlyData)}
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

            {!isLoading && activeTab === 0 && <Courses />}
            {!isLoading && activeTab === 1 && <People />}
        </div>
    );
}
