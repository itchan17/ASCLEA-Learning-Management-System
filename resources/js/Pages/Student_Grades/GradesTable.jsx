import React from 'react'
import useStudentGradesScore from "../../Stores/Student_Grades/StudentGradesScore";

const GradesTable = () => {
    const studentGrades = useStudentGradesScore((state) => state.studentGradesScore[0]);
    const courseGrades = studentGrades?.courses || [];

  return (
    <>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b-2 border-ascend-gray3">
                <th>Course Code</th>
                <th>Course Description</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            {courseGrades?.length > 0 && (
              <tbody>
                {courseGrades.map((courseGrades, index) => (
                  <tr
                    key={index}
                    className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                  >
                    <td className="py-5">{courseGrades.course_code}</td>
                    <td className="py-5">{courseGrades.course_name}</td>
                    <td className="py-5">{courseGrades.grade}</td>
                    <td className="py-5">{courseGrades.grade > 3 ? 'F' : 'P'}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
    </>
  )
}

export default GradesTable;
