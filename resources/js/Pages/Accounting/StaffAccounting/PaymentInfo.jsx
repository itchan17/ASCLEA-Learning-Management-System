import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import BackButton from "../../../Components/Button/BackButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";
import AlertModal from "../../../Components/AlertModal";
import { FaFileImage, FaFilePdf } from "react-icons/fa";
import { displayToast } from "../../../Utils/displayToast";
import { ImCancelCircle } from "react-icons/im";
import { GrRevert } from "react-icons/gr";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { usePaymentTabs } from "../../../Stores/PaymentHistory/usePaymentTabs";
import { route } from 'ziggy-js';


const PaymentInfo = () => {
  const { props } = usePage(); // props come from Inertia
  const payment = props; // payment data sent from controller
  const fileInputRef = React.useRef(null);

  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [files, setFiles] = useState(payment.files || []);
  const [filefilter, setFilefilter] = useState("Active");
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [fileToRevert, setFileToRevert] = useState(null);
  const [showArchiveAlert, setShowArchiveAlert] = useState(false);
  const [showRevertPaymentAlert, setShowRevertPaymentAlert] = useState(false);
  const { activeTab, setActiveTab } = usePaymentTabs();


  // Form data initialized from payment
  const [formData, setFormData] = useState({
    payment_method: payment.payment_method || "",
    transaction_id: payment.transaction_id || "",
    receipt_date: payment.receipt_date || "",
    payment_amount: payment.payment_amount || "",
    proof: payment.proof || null,
  });

  // Error state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when editing
  };

const validateForm = () => {
  const newErrors = {};
  if (!formData.payment_method)
    newErrors.payment_method = "Payment method is required";
  if (!formData.transaction_id)
    newErrors.transaction_id = "Transaction ID is required";
  if (!formData.receipt_date)
    newErrors.receipt_date = "Receipt date is required";
  if (!formData.payment_amount)
    newErrors.payment_amount = "Payment amount is required";

  if (files.length === 0) {
    newErrors.proof = "A file must be attached";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(files[0].type)) {
      newErrors.proof = "Only JPG, PNG, and PDF files are allowed";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSave = () => {
    if (!validateForm()) return;

  const formDataObj = new FormData();
  formDataObj.append("_method", "PUT"); 
  formDataObj.append("payment_method", formData.payment_method);
  formDataObj.append("transaction_id", formData.transaction_id);
  formDataObj.append("receipt_date", formData.receipt_date);
  formDataObj.append("payment_amount", formData.payment_amount);

  if (files.length > 0 && files[0].file) {
    formDataObj.append("proof", files[0].file);
  }

  router.post(route("paymenthistory.payment.update", payment.paymentId), formDataObj, {
    forceFormData: true,
    onSuccess: (page) => {
      displayToast(
        <DefaultCustomToast
          message={page.props.flash?.success || "Payment updated successfully!"}
        />,
        "success"
      );
      setIsEditDisabled(true);
      router.get(route("paymenthistory.paymentInfo.view", { paymentId: payment.paymentId }));
      // Fetch the latest files after saving
      router.get(
        route("paymenthistory.paymentInfo.view", { paymentId: payment.paymentId }),
        {},
        {
          preserveState: true,
          only: ["files"],
          onSuccess: (newPage) => {
            setFiles(newPage.props.files || []);
          },
        }
      );
    },
    onError: (serverErrors) => {
      setErrors(serverErrors);
    },
    preserveState: true,
  });
  };

  const handleCancel = () => {
    setFormData({
      payment_method: payment.payment_method,
      transaction_id: payment.transaction_id,
      receipt_date: payment.receipt_date,
      payment_amount: payment.payment_amount,
    });

    setFiles(payment.files || []);  

    setErrors({});
    setIsEditDisabled(true);
  };

  const handleAddFile = () => {
    fileInputRef.current.click();
  };


  const handleFileClick = (fileId) => {
    router.get(
      route("paymenthistory.payment.file.view", {
        paymentId: payment.paymentId,
        fileId: fileId,
      })
    );
  };

  files.forEach(f => console.log(f.id, f.deleted_at, typeof f.deleted_at));


const filteredFiles = files.filter((file) => {
  const isDeleted = !!file.deleted_at; 
  if (filefilter === "Active") {
    return !isDeleted;
  } else if (filefilter === "Removed") {
    return isDeleted;
  }
  return true;
});


  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleRestoreFile = (fileId) => {
    router.put(
      route("paymenthistory.payment.file.restore", {
        paymentId: payment.paymentId,
        fileId: fileId,
      }),
      {},
      {
        onSuccess: (page) => {
          displayToast(
            <DefaultCustomToast
              message={page.props.flash?.success || "File reverted successfully!"}
            />,
            "success"
          );
          // Update state with new files list from server
          setFiles(page.props.files || []);
          setIsEditDisabled(true);
        },
        onError: () => {
          displayToast(
            <DefaultCustomToast message="Failed to revert file." />,
            "error"
          );
        },
      }
    );
  };

  const handleArchive = () => {
    router.delete(
      route("paymenthistory.payment.archive", payment.paymentId),
      {
        onSuccess: (page) => {
          displayToast(
            <DefaultCustomToast
              message={page.props.flash?.success || "Payment archived successfully!"}
            />,
            "success"
          );  
          setIsEditDisabled(true);
          router.reload({ only: ["PaymentList"] });
          setActiveTab(1);

        },
        onError: () => {
          displayToast(
            <DefaultCustomToast message="Failed to archive payment." />,
            "error"
          );
        },
      }
    );
  };

  const handleRestorePayment = () => {
    router.patch(
      route("paymenthistory.payment.restore", payment.paymentId), // use directly
      {},
      {
        onSuccess: (page) => {
          displayToast(
            <DefaultCustomToast
              message={page.props.flash?.success || "Payment restored successfully!"}
            />,
            "success"
          );
          router.reload({ only: ["PaymentList"] });
          setActiveTab(0);
        },
        onError: () => {
          displayToast(
            <DefaultCustomToast message="Failed to restore payment." />,
            "error"
          );
        },
      }
    );
  };

  return (
    <>
      {/* Top Buttons */}
      <div className="flex justify-between items-center">
        <BackButton
          doSomething={() => {
            if (!isEditDisabled) {
              setShowBackConfirm(true); // open modal 
            } else {
              window.history.back();
            }
          }}
        />
        {payment.deleted_at == null ? (
          <PrimaryButton
            text="Archive"
            btnColor={isEditDisabled ? "bg-ascend-red" : "bg-ascend-gray1"}
            doSomething={isEditDisabled ? () => setShowArchiveAlert(true) : undefined}
          />
        ) : (
          <PrimaryButton
            text="Restore"
            btnColor="bg-ascend-green"
            doSomething={() => setShowRevertPaymentAlert(true)}
          />
        )}
      </div>

      {/* Student Info */}
      <div className="flex items-center mt-5">
        <div className="w-18 h-18 bg-ascend-gray1 rounded-full" />

        <div className="flex flex-col ml-2">
          <div className="flex items-center">
            <div className="font-nunito-sans text-size4 font-bold mr-3">
              {payment.user.name || "Unknown"}
            </div>
              <div className="font-nunito-sans text-size2 bg-ascend-blue text-white px-5 py-0.4">
                {payment.user.status
                  ? payment.user.status.charAt(0).toUpperCase() + payment.user.status.slice(1).toLowerCase()
                  : ""}
              </div>
          </div>
          <div className="font-nunito-sans text-size2">
            {payment.user.email}
          </div>
        </div>
      </div>
      
      {/* Edit / Save Buttons */}
      <div className="flex justify-end items-center mt-5">
        {payment.deleted_at == null && (
          isEditDisabled ? (
            <PrimaryButton
              text="Edit"
              btnColor="bg-ascend-blue"
              doSomething={() => setIsEditDisabled(false)}
            />
          ) : (
            <div className="flex gap-3">
              <SecondaryButton
                text="Cancel"
                btnColor="bg-ascend-red"
                doSomething={handleCancel}
              />
              <PrimaryButton
                text="Save"
                btnColor="bg-ascend-blue"
                doSomething={handleSave}
              />
            </div>
          )
        )}
      </div>

      {/* Payment Details */}
      <form autoComplete="off" className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="font-nunito-sans text-size2 text-ascend-black">
              Payment Method
            </label>
            <input
              type="text"
              name="payment_method"
              value={formData.payment_method}
              disabled={isEditDisabled}
              onChange={handleChange}
              className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1 ${
                isEditDisabled ? "text-ascend-gray1" : ""
              }`}
            />
            {errors.payment_method && (
              <p className="text-ascend-red text-sm mt-1">
                {errors.payment_method}
              </p>
            )}
          </div>

          {/* Transaction ID */}
          <div className="flex flex-col">
            <label className="font-nunito-sans text-size2 text-ascend-black">
              Transaction ID
            </label>
            <input
              type="text"
              name="transaction_id"
              value={formData.transaction_id}
              disabled={isEditDisabled}
              onChange={handleChange}
              className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1 ${
                isEditDisabled ? "text-ascend-gray1" : ""
              }`}
            />
            {errors.transaction_id && (
              <p className="text-ascend-red text-sm mt-1">
                {errors.transaction_id}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {/* Receipt Date */}
          <div className="flex flex-col">
            <label className="font-nunito-sans text-size2 text-ascend-black">
              Receipt Date
            </label>
            <input
              type="date"
              name="receipt_date"
              value={formData.receipt_date}
              disabled={isEditDisabled}
              onChange={handleChange}
              className={`border px-3 py-2 mt-1 focus:outline-ascend-blue ${
                errors.receipt_date
                  ? "border-ascend-red"
                  : "border-ascend-gray1"
              } ${isEditDisabled ? "text-ascend-gray1" : ""}`}
            />
            {errors.receipt_date && (
              <p className="text-ascend-red text-sm mt-1">
                {errors.receipt_date}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="font-nunito-sans text-size2 text-ascend-black">
              Amount
            </label>
            <input
              type="number"
              name="payment_amount"
              value={formData.payment_amount}
              disabled={isEditDisabled}
              onChange={handleChange}
              className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1 ${
                isEditDisabled ? "text-ascend-gray1" : ""
              }`}
            />
            {errors.payment_amount && (
              <p className="text-ascend-red text-sm mt-1">
                {errors.payment_amount}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="font-nunito-sans text-size6 font-bold">
            Attached File
          </div>

          <CustomSelect
            selectField={
                <select className="w-35 rounded-none appearance-none border border-ascend-black p-2 h-9 text-size1  focus:outline-ascend-blue" value={filefilter} onChange={(e) => setFilefilter(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Removed">Removed</option>
                </select>
            }
          />
        </div>

        {filteredFiles.length > 0 && (
          <div className="mt-5">
            <div className="mt-2 space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-3 border border-ascend-gray1 p-3 ${
                    isEditDisabled && filefilter === "Active"
                      ? "cursor-pointer hover:bg-ascend-lightblue"
                      : "cursor-default"
                  }`}
                  onClick={() => {
                    if (isEditDisabled && filefilter === "Active") handleFileClick(file.id);
                  }}
                >
                  {file.type.startsWith("image/") && (
                    <FaFileImage className={`text-2xl ${
                        filefilter === "Removed" ? "text-ascend-red" : "text-ascend-blue"
                      }`} />
                  )}
                  {file.type === "application/pdf" && (
                    <FaFilePdf className={`text-2xl ${
                        filefilter === "Removed" ? "text-ascend-red" : "text-ascend-blue"
                      }`}
                    />
                  )}

                  <span className="text-ascend-gray1 text-sm">{file.name}</span>

                  {!isEditDisabled && (
                    <>
                      {filefilter === "Active" ? (
                        // Show cancel icon if file is active
                        <ImCancelCircle
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(file.id);
                          }}
                          className="ml-auto text-ascend-blue cursor-pointer hover:bg-ascend-lightblue p-1 rounded-full transition-all duration-300"
                          size={30}
                        />
                      ) : (
                        // Show revert icon 
                        <GrRevert
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileToRevert(file.id);
                            setShowRevertAlert(true);
                          }}
                          className="ml-auto text-ascend-red cursor-pointer hover:bg-ascend-lightblue p-1 rounded-full transition-all duration-300"
                          size={30}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

          {!isEditDisabled && filefilter === "Active" && (
            <div className="flex justify-start mt-5">
              <PrimaryButton
                text="Attach"
                doSomething={handleAddFile}
                className="px-3 py-1 text-sm"
              />
            </div>
          )}

        {errors.proof && (
          <p className="text-ascend-red text-sm mt-3">
            {errors.proof}
          </p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.pdf"
          style={{ display: "none" }}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              const maxLength = 50;

              if (selectedFile.name.length > maxLength) {
                displayToast(
                  <DefaultCustomToast message={`File name should be at most ${maxLength} characters`} />,
                  "error"
                );
                e.target.value = null;
                return;
              }

              const fileExists = files.some(file => file.name === selectedFile.name);
              if (fileExists) {
                displayToast(
                  <DefaultCustomToast message="File name already exists in the active file"/>,
                  "error"
                );
                e.target.value = null;
                return;
              }

              const newFile = { id: Date.now(), name: selectedFile.name, type: selectedFile.type, file: selectedFile };
              setFiles([newFile]);
              setErrors((prev) => ({ ...prev, proof: "" })); // clear error if file added
            }
            e.target.value = null; // allow same file to be uploaded again
          }}
        />

      </form>

      {showBackConfirm && (
        <AlertModal
          title="Still In Edit Mode"
          description="Are you sure you want to go back? Any unsaved changes will be lost since you are still in editing mode."
          closeModal={() => setShowBackConfirm(false)}
          onConfirm={() => {
            setShowBackConfirm(false);
            window.history.back();
          }}
        />
      )}

      {showRevertAlert && (
        <AlertModal
          title="Revert File?"
          description="Reverting this file will replace the currently active attached file with the selected one. The current active file will be moved to removed files."
          closeModal={() => {
            setShowRevertAlert(false);
            setFileToRevert(null);
          }}
          onConfirm={() => {
            if (fileToRevert) {
              handleRestoreFile(fileToRevert); // restore only after confirm
            }
            setShowRevertAlert(false);
            setFileToRevert(null);
          }}
        />
      )}

        {showArchiveAlert && (
        <AlertModal
          title="Archive Payment?"
          description="Archiving this payment will move it to the archived payments list."
          closeModal={() => {
            setShowArchiveAlert(false);
          }}
          onConfirm={() => {
            handleArchive(); 
            setShowArchiveAlert(false);
          }}
        />
        )}

        {showRevertPaymentAlert && (
        <AlertModal
          title="Restore Payment?"
          description="Restoring this payment will move it back to the active payments list."
          closeModal={() => {
            setShowRevertPaymentAlert(false);
          }}
          onConfirm={() => {
            handleRestorePayment(); 
            setShowRevertPaymentAlert(false);
          }}
        />
        )}

    </>
  );
};

export default PaymentInfo;
