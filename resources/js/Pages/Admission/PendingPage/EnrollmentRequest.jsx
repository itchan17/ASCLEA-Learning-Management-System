import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import BackButton from "../../../Components/Button/BackButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import ApprovalModal from "./ApprovalModal";
import RejectionModal from "./RejectionModal";
import { FaFileImage, FaFilePdf } from "react-icons/fa";

const EnrollmentRequest = () => {
  const { student } = usePage().props; // directly from Inertia
  const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);

  const toggleModalApprove = () => setIsModalOpenApprove(!isModalOpenApprove);
  const toggleModalReject = () => setIsModalOpenReject(!isModalOpenReject);

  return (
    <div className="space-y-5">
      {/* Header with Back + Approve/Reject */}
      <div className="flex justify-between items-center">
        <BackButton doSomething={() => window.history.back()} />
        <div className="flex space-x-3">
          <PrimaryButton
            text="Reject"
            btnColor="bg-ascend-red"
            textColor="text-white"
            doSomething={toggleModalReject}
          />
          <PrimaryButton
            text="Approve"
            btnColor="bg-ascend-blue"
            textColor="text-white"
            doSomething={toggleModalApprove}
          />
        </div>
      </div>

      {/* Student Info */}
      <div className="pl-4">
        <div className="font-nunito-sans text-size6 font-bold mt-5">
          Program Enrollment Request
        </div>

        <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="font-nunito-sans text-size3 font-bold">Full Name</div>
            <div className="font-nunito-sans text-size3 mt-3">
              {student.user.first_name}{" "}
              {student.user.middle_name ? student.user.middle_name + " " : ""}
              {student.user.last_name}
            </div>
          </div>
          <div>
            <div className="font-nunito-sans text-size3 font-bold">Date of Application</div>
            <div className="font-nunito-sans text-size3 mt-3">
              {new Date(student.created_at).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="font-nunito-sans text-size3 font-bold mt-5">Address</div>
            <div className="font-nunito-sans text-size3 mt-3">
              {student.user.house_no || "N/A"}, {student.user.barangay || "N/A"}, {student.user.city || "N/A"}, {student.user.province || "N/A"}, <br />{student.user.region || "N/A"}
            </div>
          </div>
        </div>

        {/* Admission Files */}
        <div className="mt-6">
        <div className="font-nunito-sans text-size6 font-bold mt-5">Attached Files</div>

        {student.admissionFiles && student.admissionFiles.length > 0 ? (
            <div className="mt-3 space-y-2">
            {student.admissionFiles.map((file) => (
                <div
                key={file.admission_file_id}
                className="flex items-center gap-3 border border-ascend-gray1 p-3 cursor-pointer hover:bg-ascend-lightblue"
                onClick={() => window.open(
                    file.file_path.startsWith("http") ? file.file_path : `/storage/${file.file_path}`,
                    "_blank"
                )}
                >
                {file.file_type.startsWith("image/") && <FaFileImage className="text-2xl text-ascend-blue" />}
                {file.file_type === "application/pdf" && <FaFilePdf className="text-2xl text-ascend-blue" />}
                <span className="text-ascend-gray1 text-sm">{file.file_name}</span>
                </div>
            ))}
            </div>
        ) : (
            <p className="mt-3 text-ascend-gray1">No files uploaded.</p>
        )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpenApprove && <ApprovalModal toggleModal={toggleModalApprove} />}
      {isModalOpenReject && <RejectionModal toggleModal={toggleModalReject} />}
    </div>
  );
};

export default EnrollmentRequest;
