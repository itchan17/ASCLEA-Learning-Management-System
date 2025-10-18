import React from "react";
import useModulesStore from "../Stores/modulesStore";
import MaterialItem from "./MaterialItem";

export default function MaterialList() {
    const materialList = useModulesStore((state) => state.materialList);

    return (
        <div>
            {/* Dropdown for material list */}
            {materialList?.length > 0 && (
                <div className="flex flex-col space-y-5">
                    {materialList.map((material, index) => (
                        <MaterialItem key={index} materialDetails={material} />
                    ))}
                </div>
            )}
        </div>
    );
}
