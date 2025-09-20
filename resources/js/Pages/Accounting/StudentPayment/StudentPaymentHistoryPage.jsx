import React from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import EmptyState from "../../../Components/EmptyState/EmptyState";

const StudentPaymentHistoryPage = ({ payments }) => {
  const handleRowClick = (paymentId) => {
    router.visit(route('paymenthistory.student.paymentInfo.view', paymentId));
  };

  return (
    <div className="mt-5">
      <h1 className="font-nunito-sans text-size6 font-bold mt-5">My Payment History</h1>

      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr className="border-b-2 border-ascend-gray3">
              <th>Payment method</th>
              <th>Transaction ID</th>
              <th>Receipt date</th>
              <th>Payment amount</th>
              <th>Action</th>
            </tr>
          </thead>

          {payments?.length > 0 ? (
            <tbody>
              {payments.map((ph) => (
                <tr
                  key={ph.payment_id}
                  onClick={() => handleRowClick(ph.payment_id)}
                  className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                >
                  <td className="py-5">{ph.payment_method}</td>
                  <td className="py-5">{ph.transaction_id}</td>
                  <td className="py-5">{ph.receipt_date}</td>
                  <td className="py-5">{ph.payment_amount}</td>
                  <td className="py-5 text-ascend-blue underline">
                    View More
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <div className="flex flex-col items-center justify-center py-20">
                    <EmptyState
                      imgSrc={"/images/illustrations/No-Money.svg"}
                      text={"No payment history available yet."}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default StudentPaymentHistoryPage;
