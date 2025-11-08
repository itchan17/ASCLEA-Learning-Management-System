import React from 'react'

const CoursesTable = ({student}) => {
    const courses = student?.courses || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="font-nunito-sans text-size6 font-bold">Progams & Courses</div>
        <div className="flex justify-end">
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b-2 border-ascend-lightblue">
              <th>Erolled Courses</th>
              <th>Final Grade</th>
            </tr>
          </thead>
            <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr
                  key={index}
                  className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-lightblue"
                >
                  <td className="py-5">{course.name}</td>
                  <td className="py-5">{course.grade}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-5 text-ascend-gray2">
                  No courses enrolled.
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
