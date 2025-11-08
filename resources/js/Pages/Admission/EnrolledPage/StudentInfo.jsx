import React from 'react'
import BackButton from '../../../Components/Button/BackButton';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import useEnrolledStore from "../../../Stores/Admission/EnrolledStore";
import { usePage } from '@inertiajs/react'
import DataFormFields from './DataFormFields';
import CoursesTable from "./CoursesTable";
import AssesstmentTable from './AssesstmentTable';
import { useState } from 'react';

const StudentInfo = () => {
  const { student, learningMembers, completedAssessments } = usePage().props;
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  return (
    <>
      <div className="flex items-center justify-between">
        <BackButton doSomething={() => window.history.back()} />
        {!isEditDisabled ? (
          <PrimaryButton text="Archive" btnColor="bg-ascend-red" />
        ) : (
          <PrimaryButton text="Archive" btnColor="bg-ascend-red" />
        )}
      </div>

      {/* Student Header */}
      <div className="flex items-center mt-5">
        <div className="w-18 h-18 bg-ascend-gray1 rounded-full"></div>
        <div className="flex flex-col ml-2">
          <div className="flex items-center">
            <div className="font-nunito-sans text-size4 ml-5 font-bold">
              {student.user.first_name} {student.user.last_name}
            </div>
            <div
              className={`font-nunito-sans text-size2 ml-2 text-ascend-white ${
                student.enrollment_status === "enrolled"
                  ? "bg-ascend-blue"
                  : student.enrollment_status === "dropped"
                  ? "bg-ascend-red"
                  : "bg-ascend-yellow"
              } px-3`}
            >
              {student.enrollment_status.charAt(0).toUpperCase() + student.enrollment_status.slice(1)}
            </div>
          </div>
          <div className="font-nunito-sans text-size2 ml-5">Student</div>
        </div>
      </div>

      {/* Approval Info */}
      <div className="mt-5 flex items-center justify-between">
        <div className="font-nunito-sans text-size2">
          Approved enrollment by: Name
        </div>
      </div>
      {/* Data Form Fields */}
      <div className="mt-5">
        <DataFormFields
          student={student}
          setIsEditDisabled={setIsEditDisabled}
          isEditDisabled={isEditDisabled}
        />
      </div>
      {/* Courses Table */}
      <div className="mt-10">
        <CoursesTable learningMembers={learningMembers} />
      </div>
      {/* Assessment Table */}
      <div className="mt-10">
        <AssesstmentTable completedAssessments={completedAssessments ?? []} />
      </div>
    </>
  );
};

export default StudentInfo;