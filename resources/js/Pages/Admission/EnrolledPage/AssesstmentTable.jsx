import React from 'react';

const AssesstmentTable = ({ completedAssessments }) => {
  return (
    <div className="font-nunito-sans space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-size6 font-bold">Completed Assessments</h1>
      </div>

      {/*=========================== Assessments Table ===========================*/}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b-2 border-ascend-gray3 text-ascend-black font-bold">
              <th>Assessment Name</th>
              <th>Course Name</th>
              <th>Points</th>
              <th>Status</th>
              <th>Date Submitted</th>
            </tr>
          </thead>

          <tbody>
            {completedAssessments.length > 0 ? (
              completedAssessments.map((assessment, index) => (
                <tr
                  key={index}
                  className="hover:bg-ascend-lightblue cursor-pointer"
                >
                  <td>{assessment.assessment_name}</td>
                  <td>{assessment.course_name}</td>
                  <td>{assessment.score}</td>
                  <td>{assessment.status}</td>
                  <td>{new Date(assessment.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5 text-ascend-gray2 italic">
                  No assessments completed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssesstmentTable;
