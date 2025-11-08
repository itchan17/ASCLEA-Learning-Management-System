import React, { useState } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import BackButton from '../../../Components/Button/BackButton';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import useEnrolledStore from "../../../Stores/Admission/EnrolledStore";
import DataFormFields from './DataFormFields';
import CoursesTable from "./CoursesTable";
import AssesstmentTable from './AssesstmentTable';
import AlertModal from '../../../Components/AlertModal';
import { displayToast } from '../../../Utils/displayToast';
import DefaultCustomToast from '../../../Components/CustomToast/DefaultCustomToast';

const StudentInfo = () => {
  const { student, learningMembers, completedAssessments } = usePage().props;
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isArchiveLoading, setIsArchiveLoading] = useState(false);

  const handleArchive = () => {
  setIsArchiveLoading(true);

  router.delete(route("students.archive", student.student_id), {
    onSuccess: (page) => {
      setIsArchiveLoading(false);
      setOpenAlertModal(false);
      displayToast(
        <DefaultCustomToast message={page.props.flash.success || "Student archived successfully!"} />,
        "success"
      );
    },
    onError: (errors) => {
      setIsArchiveLoading(false);
      displayToast(
        <DefaultCustomToast message="Failed to archive student." />,
        "error"
      );
    },
  });
};


  return (
    <>
      {/*===========================Alert Modal for Archiving Student===========================*/}
      {openAlertModal && (
        <AlertModal
          title={"Archive Confirmation"}
          description={"Are you sure you want to archive this student?"}
          closeModal={() => setOpenAlertModal(false)}
          onConfirm={handleArchive}
          isLoading={isArchiveLoading}
        />
      )}

      <div className="flex items-center justify-between">
        <BackButton doSomething={() => window.history.back()} />
        <PrimaryButton
          text="Archive"
          btnColor="bg-ascend-red"
          doSomething={() => setOpenAlertModal(true)}
        />
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