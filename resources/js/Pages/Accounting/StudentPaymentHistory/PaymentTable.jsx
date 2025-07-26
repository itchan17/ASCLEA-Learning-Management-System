import React from 'react';
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import usePaymentStore from "../../../Stores/Accounting/PaymentStore";

const PaymentTable = () => {
  const PaymentList = usePaymentStore((state) => state.PaymentList);
  const route = useRoute();

  const handleRowClick = (paymentId) => {
  router.visit(route("accounting.paymentInfo.view", { paymentId }));
};

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="border-b-2 border-ascend-gray3">
            <th>Payment method</th>
            <th>Payment Transaction ID</th>
            <th>Receipt date</th>
            <th>Payment amount</th>
            <th>Action</th>
          </tr>
        </thead>
        {PaymentList?.length > 0 && (
          <tbody>
            {PaymentList.map((ph, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(ph.id)}
                className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
              >
                <td className="py-5">{ph.payment_method}</td>
                <td className="py-5">{ph.transaction_id}</td>
                <td className="py-5">{ph.receipt_date}</td>
                <td className="py-5">{ph.amount}</td>
                <td className="py-5">
                    <span className="text-ascend-blue underline">
                    View More
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default PaymentTable;
