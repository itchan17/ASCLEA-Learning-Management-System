import React from "react";
import useModulesStore from "../Stores/modulesStore";
import Section from "./Section";

export default function SectionList() {
    const sectionList = useModulesStore((state) => state.sectionList);
    return (
        <div>
            {sectionList?.length > 0 && (
                <div className="flex flex-col space-y-5">
                    {/* Display the list of sections */}
                    {sectionList &&
                        sectionList.map((section, index) => (
                            <Section key={index} sectionDetails={section} />
                        ))}
                </div>
            )}
        </div>
    );
}
