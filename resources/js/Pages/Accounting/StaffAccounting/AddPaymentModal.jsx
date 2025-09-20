import React, { useState, useRef } from "react";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import ModalContainer from "../../../Components/ModalContainer";
import { displayToast } from "../../../Utils/displayToast";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { FaFileImage, FaFilePdf } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { router, usePage } from "@inertiajs/react";

export default function AddPaymentModal({ togglePaymentForm, userId }) {
  const [formData, setFormData] = useState({
    payment_method: "",
    transaction_id: "",
    receipt_date: "",
    payment_amount: "",
    proof: null,
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const { props } = usePage();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setFormData({ ...formData, proof: files[0] });
      setErrors((prev) => ({ ...prev, proof: "" })); // clear error
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
    }
  };

  // Validate fields before submission
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
    if (!formData.proof)
      newErrors.proof = "Proof of payment is required";

    if (formData.proof) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(formData.proof.type)) {
        newErrors.proof = "Only JPG, PNG, and PDF files are allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle Add Payment
  const handleAddPayment = () => {
    if (!validateForm()) return; // stop if validation fails

    const data = new FormData();
    data.append("payment_method", formData.payment_method);
    data.append("transaction_id", formData.transaction_id);
    data.append("receipt_date", formData.receipt_date);
    data.append("payment_amount", formData.payment_amount);
    data.append("user_id", userId);

    if (formData.proof) {
      data.append("proof", formData.proof);
    }

    router.post(route("paymenthistory.payment.store"), data, {
      onSuccess: (page) => {
        displayToast(
          <DefaultCustomToast
            message={page.props.flash?.success || "Payment added successfully!"}
          />,
          "success"
        );
        togglePaymentForm();
      },
      onError: (serverErrors) => {
        setErrors(serverErrors);
      },
      preserveState: true,
    });
  };

  // Open file selector
  const handleAddFile = () => {
    fileInputRef.current.click();
  };

  // Determine icon based on file type
    const renderFilePreview = () => {
      if (!formData.proof) return null;

      const file = formData.proof;
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      const handleRemoveFile = () => {
        setFormData({ ...formData, proof: null });
        setErrors((prev) => ({ ...prev, proof: "" }));
      };

      return (
        <div className="flex items-center justify-between border border-ascend-gray1 p-3 mb-2 mt-2">
          {/* File type icon */}
          <div className="flex items-center gap-3">
            {isImage && <FaFileImage className="text-ascend-blue text-2xl flex-shrink-0" />}
            {isPdf && <FaFilePdf className="text-ascend-blue text-2xl flex-shrink-0" />}

            {/* File name */}
            <span
              className="text-ascend-gray3 text-sm truncate"
              style={{ maxWidth: "200px" }}
              title={file.name}
            >
              {file.name}
            </span>
          </div>

          {/* Cancel icon */}
          <ImCancelCircle
            onClick={handleRemoveFile}
            className="text-ascend-blue cursor-pointer hover:bg-ascend-lightblue p-1 rounded-full transition-all duration-300"
            size={30}
          />
        </div>
      );
    };

  return (
    <ModalContainer>
      <form className="bg-ascend-white opacity-100 p-5 w-112 space-y-5">
        <h1 className="text-size4 font-bold">Add Payment</h1>

        {/* Payment Method */}
        <div className="flex flex-col">
          <label className="text-size2 text-ascend-black">
            Payment Method<span className="text-ascend-red">*</span>
          </label>
          <input
            type="text"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1`}
          />
          {errors.payment_method && (
            <p className="text-ascend-red text-sm mt-1">{errors.payment_method}</p>
          )}
        </div>

        {/* Transaction ID */}
        <div className="flex flex-col">
          <label className="text-size2 text-ascend-black">
            Payment Transaction ID<span className="text-ascend-red">*</span>
          </label>
          <input
            type="text"
            name="transaction_id"
            value={formData.transaction_id}
            onChange={handleChange}
            className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1`}
          />
          {errors.transaction_id && (
            <p className="text-ascend-red text-sm mt-1">{errors.transaction_id}</p>
          )}
        </div>

        {/* Receipt Date */}
        <div className="flex flex-col">
          <label className="text-size2 text-ascend-black">
            Receipt Date<span className="text-ascend-red">*</span>
          </label>
          <input
            type="date"
            name="receipt_date"
            value={formData.receipt_date}
            onChange={handleChange}
            className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1`}
          />
          {errors.receipt_date && (
            <p className="text-ascend-red text-sm mt-1">{errors.receipt_date}</p>
          )}
        </div>

        {/* Payment Amount */}
        <div className="flex flex-col">
          <label className="text-size2 text-ascend-black">
            Payment Amount<span className="text-ascend-red">*</span>
          </label>
          <input
            type="number"
            name="payment_amount"
            value={formData.payment_amount}
            onChange={handleChange}
            min="0"
            className={`border px-3 py-2 mt-1 focus:outline-ascend-blue border-ascend-gray1`}
          />
          {errors.payment_amount && (
            <p className="text-ascend-red text-sm mt-1">{errors.payment_amount}</p>
          )}
        </div>

        {/* Proof of Payment */}
        <div className="flex flex-col">
          <label className="text-size2 text-ascend-black">
            Proof of Payment<span className="text-ascend-red">*</span>
          </label>

          {renderFilePreview()}

          <div className="flex justify-start mt-1">
            <PrimaryButton
              text={"Attach"}
              doSomething={handleAddFile}
              className="px-3 py-1 text-sm"
            />
          </div>

          <input
            type="file"
            name="proof"
            ref={fileInputRef}
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ display: "none" }}
          />

          {errors.proof && (
            <p className="text-ascend-red text-sm mt-1">{errors.proof}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <SecondaryButton text={"Cancel"} doSomething={togglePaymentForm} />
          <PrimaryButton text={"Add"} doSomething={handleAddPayment} />
        </div>
      </form>
    </ModalContainer>
  );
}
