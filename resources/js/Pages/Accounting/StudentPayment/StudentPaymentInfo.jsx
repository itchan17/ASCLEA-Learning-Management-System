import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import BackButton from "../../../Components/Button/BackButton";
import { FaFileImage, FaFilePdf } from "react-icons/fa";

const PaymentInfo = () => {
  const { props } = usePage();
  const payment = props; // payment data sent from controller

  const [filefilter, setFilefilter] = useState("Active");
  const files = payment.files || [];

  const handleFileClick = (fileId) => {
    router.get(
      route("paymenthistory.student.payment.file.view", {
        paymentId: payment.paymentId,
        fileId: fileId,
      })
    );
  };

  const filteredFiles = files.filter((file) => {
    if (filefilter === "Active") return !file.deleted_at;
    if (filefilter === "Removed") return Boolean(file.deleted_at);
    return true;
  });

  return (
    <>
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <BackButton doSomething={() => window.history.back()} />
      </div>

      {/* Student Info */}
      <div className="flex items-center mt-5">
        <h1 className="font-nunito-sans text-size6 font-bold"> Payment Info</h1>
      </div>

      {/* Payment Details */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-nunito-sans text-size2 text-ascend-black">
            Payment Method
          </label>
          <div className="border px-3 py-2 mt-1 border-ascend-gray1 bg-gray-100">
            {payment.payment_method}
          </div>
        </div>

        <div>
          <label className="font-nunito-sans text-size2 text-ascend-black">
            Transaction ID
          </label>
          <div className="border px-3 py-2 mt-1 border-ascend-gray1 bg-gray-100">
            {payment.transaction_id}
          </div>
        </div>

        <div>
          <label className="font-nunito-sans text-size2 text-ascend-black">
            Receipt Date
          </label>
          <div className="border px-3 py-2 mt-1 border-ascend-gray1 bg-gray-100">
            {payment.receipt_date}
          </div>
        </div>

        <div>
          <label className="font-nunito-sans text-size2 text-ascend-black">
            Amount
          </label>
          <div className="border px-3 py-2 mt-1 border-ascend-gray1 bg-gray-100">
            {payment.payment_amount}
          </div>
        </div>
      </div>

      {/* Attached Files */}
      <div className="flex items-center justify-between mt-6">
        <div className="font-nunito-sans text-size6 font-bold">
          Attached Files
        </div>
      </div>

      {filteredFiles.length > 0 ? (
        <div className="mt-5 space-y-2">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 border border-ascend-gray1 p-3 cursor-pointer hover:bg-ascend-lightblue"
              onClick={() => handleFileClick(file.id)}
            >
              {file.type.startsWith("image/") && (
                <FaFileImage
                  className={`text-2xl ${
                    filefilter === "Removed"
                      ? "text-ascend-red"
                      : "text-ascend-blue"
                  }`}
                />
              )}
              {file.type === "application/pdf" && (
                <FaFilePdf
                  className={`text-2xl ${
                    filefilter === "Removed"
                      ? "text-ascend-red"
                      : "text-ascend-blue"
                  }`}
                />
              )}
              <span className="text-ascend-gray1 text-sm">{file.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-ascend-gray1">No files attached.</p>
      )}
    </>
  );
};

export default PaymentInfo;
