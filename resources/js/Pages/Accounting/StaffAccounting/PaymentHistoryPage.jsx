import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import AddPaymentModal from './AddPaymentModal';
import { usePaymentTabs } from "../../../Stores/PaymentHistory/usePaymentTabs";

const PaymentHistoryPage = ({ PaymentList, student }) => {
  const handleRowClick = (paymentId) => {
    router.visit(route('paymenthistory.paymentInfo.view', paymentId));
  };

  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const { activeTab, setActiveTab } = usePaymentTabs();

  const toggleAddPayment = () => {
    setShowAddPaymentModal(!showAddPaymentModal);
  };

  useEffect(() => {
    router.reload({ only: ['PaymentList'] }); // re-fetch only PaymentList
  }, []);

  // Filter payments based on active tab
  const filteredPayments =
    activeTab === 0
      ? PaymentList?.data?.filter((p) => p.deleted_at === null)
      : PaymentList?.data?.filter((p) => p.deleted_at !== null);

  return (
    <>
      {/* Tabs */}
      <div className="h-12 border-b border-ascend-gray1 w-full py-1 flex justify-center items-center overflow-x-auto space-x-1 font-nunito-sans text-ascend-black">
        <div
          onClick={() => setActiveTab(0)}
          className={`py-1.5 px-8 cursor-pointer font-bold hover:bg-ascend-lightblue transition-all duration-300 ${
            activeTab === 0 && "bg-ascend-lightblue text-ascend-blue"
          }`}
        >
          Active 
        </div>
        <div
          onClick={() => setActiveTab(1)}
          className={`py-1.5 px-8 cursor-pointer font-bold hover:bg-ascend-lightblue transition-all duration-300 ${
            activeTab === 1 && "bg-ascend-lightblue text-ascend-blue"
          }`}
        >
          Archived 
        </div>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="font-nunito-sans text-size6 font-bold mt-5">
          {student.name}
        </div>
        {activeTab === 0 && (
          <PrimaryButton text="Add Payment" doSomething={toggleAddPayment} />
        )}
      </div>

      {activeTab === 0 && (
        <div className="flex items-center justify-between mt-5">
          <PrimaryButton text="Download" />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr className="border-b-2 border-ascend-gray3">
              <th>Payment method</th>
              <th>Payment transaction ID</th>
              <th>Receipt date</th>
              <th>Payment amount</th>
              {activeTab === 1 && <th>Deleted At</th>}
              <th>Action</th>
            </tr>
          </thead>
          {filteredPayments?.length > 0 ? (
            <tbody>
              {filteredPayments.map((ph) => (
                <tr
                  key={ph.payment_id}
                  onClick={() => handleRowClick(ph.payment_id)}
                  className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                >
                  <td className="py-5">{ph.payment_method}</td>
                  <td className="py-5">{ph.transaction_id}</td>
                  <td className="py-5">{ph.receipt_date}</td>
                  <td className="py-5">{ph.payment_amount}</td>
                    {activeTab === 1 && (
                      <td className="py-5">
                        {ph.deleted_at
                          ? new Date(ph.deleted_at).toISOString().split("T")[0] // YYYY-MM-DD
                          : "-"}
                      </td>
                    )}
                  <td className="py-5">
                    <span className="text-ascend-blue underline">View More</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={activeTab === 1 ? 6 : 5} className="text-center py-5">
                  No records found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>


      {showAddPaymentModal && (
        <AddPaymentModal
          userId={student.user_id}
          togglePaymentForm={toggleAddPayment}
        />
      )}
    </>
  );
};

export default PaymentHistoryPage;
