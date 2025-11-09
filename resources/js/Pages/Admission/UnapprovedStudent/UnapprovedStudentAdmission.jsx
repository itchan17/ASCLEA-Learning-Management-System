import { useState } from "react";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import DropFiles from "../../../Components/DragNDropFiles/DropFiles";
import { displayToast } from "../../../Utils/displayToast";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { FaFileImage, FaFilePdf } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { router } from "@inertiajs/react";

    
export default function UnapprovedStudentAdmission({student}) {
    const [openForm, setOpenForm] = useState(false);
    const [submitted, setSubmitted] = useState();
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    const handleFileChange = (fieldName, files) => {
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    console.log("Student Admission Status:", student?.admission_status);

    const handleSubmit = () => {
        if (uploadedFiles.length === 0) {
            displayToast(
                <DefaultCustomToast message="Please upload at least one file." />,
                "error"
            );
            return;
        }

        if (uploadedFiles.length > 5) {
            displayToast(
                <DefaultCustomToast message="You can upload a maximum of 5 files." />,
                "error"
            );
            return;
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
        const invalidFiles = uploadedFiles.filter(
            (file) => !allowedTypes.includes(file.type)
        );

        if (invalidFiles.length > 0) {
            displayToast(
                <DefaultCustomToast message="Only JPG, JPEG, PNG, or PDF files are allowed." />,
                "error"
            );
            return;
        }

        const data = new FormData();
        uploadedFiles.forEach((file) => {
            data.append("files[]", file);
        });

        router.post(route("admissionfiles.upload"), data, {
            onSuccess: (page) => {
                displayToast(
                    <DefaultCustomToast message={page.props.flash?.success || "Files uploaded successfully!"} />,
                    "success"
                );
                setUploadedFiles([]);
                toggleForm();
                setSubmitted(true);
            },
            onError: (errors) => {
                displayToast(
                    <DefaultCustomToast message="Upload failed. Please try again." />,
                    "error"
                );
                console.error(errors);
            },
        });
    };


    return (
        <div className="flex justify-center font-nunito-sans">
            {submitted || student?.admission_status === "Pending" ? (
              <div className="flex flex-col justify-center">
                  <div className="flex justify-center items-center font-bold">
                      <h1 className="pr-3">Status:</h1>
                      <div className="w-4 h-4 bg-ascend-yellow rounded-4xl shrink-0 mr-1"></div>
                      <span>Pending Review</span>
                  </div>
                  <EmptyState
                      imgSrc="/images/illustrations/review.svg"
                      text="“Your account is currently under review. Please wait while we verify your information. You'll be notified once it's complete.”"
                  />
              </div>
          ) : null}

          {student?.admission_status === "Accepted" ? (
              <div className="flex flex-col justify-center">
                  <div className="flex justify-center items-center font-bold">
                      <h1 className="pr-3">Status:</h1>
                      <div className="w-4 h-4 bg-ascend-green rounded-4xl shrink-0 mr-1"></div>
                      <span>Accepted</span>
                  </div>
                  <EmptyState
                      imgSrc="/images/illustrations/AcceptedAdmission.svg"
                      text="“Congratulations! Your admission has been accepted. Welcome aboard!”"
                  />
              </div>
          ) : null}

          {student?.admission_status === "Rejected" ? (
              <div className="flex flex-col justify-center">
                  <div className="flex justify-center items-center font-bold">
                      <h1 className="pr-3">Status:</h1>
                      <div className="w-4 h-4 bg-ascend-red rounded-4xl shrink-0 mr-1"></div>
                      <span>Rejected</span>
                  </div>
                  <div className="flex flex-col justify-center space-y-5">
                      <EmptyState
                          imgSrc="/images/illustrations/RejectedAdmission.svg"
                          text="“Unfortunately, your admission was not approved. You may re-upload the required documents for reconsideration.”"
                      />
                      <PrimaryButton
                          doSomething={toggleForm}
                          text="Upload File"
                      />
                  </div>
              </div>
          ) : null}

          {student?.admission_status === null && (
              <div className="flex flex-col justify-center space-y-5">
                  <EmptyState
                      imgSrc="/images/illustrations/upload_document.svg"
                      text="“One step away! Upload your proof of enrollment to start exploring.”"
                  />
                  <PrimaryButton
                      doSomething={toggleForm}
                      text="Upload File"
                  />
              </div>
          )}

            

        {openForm && (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
          <form className="bg-ascend-white opacity-100 p-5 w-150 space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto my-10 rounded-xl shadow-lg">
            <h1 className="text-size4 font-bold">Add File</h1>

            {/* DropFiles Component */}
            <DropFiles
              withCancel={true}
              handleFileChange={handleFileChange}
              fieldName="upload"
            />

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold text-size2 mb-2">Uploaded Files</h2>
                {uploadedFiles.map((file, index) => {
                  const fileType = file.type;
                  const isImage = fileType.startsWith("image/");
                  const isPdf = fileType === "application/pdf";
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-ascend-gray1 p-3 mb-2 mt-2 hover:bg-ascend-lightblue/20 transition-all duration-300"
                    >
                      {/* File type + name */}
                      <div className="flex items-center gap-3">
                        {isImage && (
                          <FaFileImage className="text-ascend-blue text-2xl flex-shrink-0" />
                        )}
                        {isPdf && (
                          <FaFilePdf className="text-ascend-blue text-2xl flex-shrink-0" />
                        )}

                        {/* File name */}
                        <span
                          className="text-ascend-gray3 text-sm truncate"
                          style={{ maxWidth: "200px" }}
                          title={file.name}
                        >
                          {file.name}
                        </span>
                      </div>

                      {/* Remove Icon */}
                      <ImCancelCircle
                        onClick={() => handleRemoveFile(index)}
                        className="text-ascend-blue cursor-pointer hover:bg-ascend-lightblue p-1 rounded-full transition-all duration-300"
                        size={30}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <SecondaryButton doSomething={toggleForm} text={"Cancel"} />
              <PrimaryButton doSomething={handleSubmit} text={"Submit"} />
            </div>
          </form>
        </div>
      )}
        </div>
    );
}
