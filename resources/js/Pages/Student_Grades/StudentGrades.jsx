import React from "react";
import GradesTable from "./GradesTable";
import { capitalize } from "lodash";

const StudentGrades = ({ studentData }) => {
    return (
        <>
            <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                    <img
                        src={
                            studentData.profile_image &&
                            `/storage/${studentData.profile_image}`
                        }
                        alt="Profile image"
                        className="w-16 h-16 bg-ascend-gray1/20 rounded-4xl shrink-0"
                    ></img>
                    <div className="ml-4">
                        <div className="font-nunito-sans text-size4 font-bold">
                            {studentData.first_name} {studentData.last_name}
                        </div>
                        <div className="font-nunito-sans text-size2">
                            {capitalize(studentData.role.role_name)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <GradesTable />
            </div>
        </>
    );
};

export default StudentGrades;
