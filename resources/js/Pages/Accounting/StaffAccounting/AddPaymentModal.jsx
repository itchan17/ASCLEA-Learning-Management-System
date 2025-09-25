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
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef(null);
  const { props } = usePage();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, proof: file });
        setErrors((prev) => ({ ...prev, proof: "" })); // clear error
      }
      e.target.value = null; // Reset file input
    } else {
    if ((name === "transaction_id" || name === "payment_method") && value.trim() === "") {
      setFormData({ ...formData, [name]: "" });
      setErrors((prev) => ({ ...prev, [name]: "This field cannot be empty or spaces only." }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    }
  };

  // Function to handle Add Payment
  const handleAddPayment = () => {
  setIsValidating(true);
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
    showProgress: false,   
    onSuccess: (page) => {
      displayToast(
        <DefaultCustomToast
          message={page.props.flash?.success || "Payment added successfully!"}
        />,
        "success"
      );
      togglePaymentForm();
      setIsValidating(false);
    },
    onError: (serverErrors) => {
      setErrors(serverErrors); 
      if (serverErrors.proof) {
        setFormData((prev) => ({ ...prev, proof: null }));
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
      setIsValidating(false);
    },
    onFinish: () => {
      setIsValidating(false); 
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

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
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
          <PrimaryButton text={"Add"} isDisabled={isValidating} isLoading={isValidating} doSomething={handleAddPayment} />
        </div>
      </form>
    </ModalContainer>
  );
}
