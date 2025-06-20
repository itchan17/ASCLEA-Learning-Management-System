import React from 'react'
import { IoSearch } from "react-icons/io5";

const CoursesTable = ({student}) => {
    const courses = student?.courses || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="font-nunito-sans text-size6 font-bold">Courses</div>
        <div className="flex justify-end">
          <div className="relative">
            <input
              className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
              type="text"
              placeholder="Search"
            />
            <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
          </div>
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
