import React from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import GradesTable from "./GradesComponents/GradesTable";

export default function Grades() {
    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Title</h1>
                <PrimaryButton text="Post Grades" />
            </div>
            <GradesTable />
        </div>
    );
}
