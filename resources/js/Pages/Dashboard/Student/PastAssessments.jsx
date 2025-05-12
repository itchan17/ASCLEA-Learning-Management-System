import React from "react";

export default function PastAssessments() {
    return (
        <div className="pt-5 space-y-5">
            <h1 className="text-size4 font-bold">Past Assessments</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th>Course</th>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Possible Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-ascend-lightblue cursor-pointer">
                            <td>Educ 101</td>
                            <td>Drill title</td>
                            <td>April 14, 2025</td>
                            <td>150</td>
                        </tr>
                        <tr className="hover:bg-ascend-lightblue cursor-pointer">
                            <td>Educ 102</td>
                            <td>Drill title</td>
                            <td>April 14, 2025</td>
                            <td>150</td>
                        </tr>
                        <tr className="hover:bg-ascend-lightblue cursor-pointer">
                            <td>Educ 103</td>
                            <td>Drill title</td>
                            <td>April 14, 2025</td>
                            <td>150</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
