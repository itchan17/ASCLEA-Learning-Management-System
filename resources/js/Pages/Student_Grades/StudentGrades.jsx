import React from 'react'
import useStudentGradesScore from "../../Stores/Student_Grades/StudentGradesScore";
import GradesTable from './GradesTable';

const StudentGrades = () => {
    const studentGrades = useStudentGradesScore((state) => state.studentGradesScore[0]);

  return (
    <>
    <div className="flex items-center justify-between mt-5">
    <div className="flex items-center">
        <div className="w-16 h-16 bg-ascend-gray1 rounded-full"></div>
        <div className="ml-4">
        <div className="font-nunito-sans text-size4 font-bold">
            {studentGrades.first_name} {studentGrades.last_name}
        </div>
        <div className="font-nunito-sans text-size2">Student</div>
        </div>
    </div>

    <div className="text-right">
        <div className="font-nunito-sans text-size2">{studentGrades.program}</div>
        <div className="font-nunito-sans text-size2">{studentGrades.year}</div>
    </div>
    </div>
    
    <div className="mt-5">
    <GradesTable />
    </div>


    </>
  )
}

export default StudentGrades;
