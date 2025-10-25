import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import useAccountingStore from "../../../Stores/Accounting/AccountingStore";
import usePaymentStore from "../../../Stores/Accounting/PaymentStore";
import PrimaryButton from "../../../Components/Button/PrimaryButton";

const PaymentHistoryPage = () => {
    const { props } = usePage();
    const studentId = props.studentId;

    const AccountingList = useAccountingStore((state) => state.AccountingList);

    const student = AccountingList.find((item) => item.id === Number(studentId));

  const PaymentList = usePaymentStore((state) => state.PaymentList);
  const route = useRoute();

  const handleRowClick = (paymentId) => {
  router.visit(route("accounting.payment.view", {
    paymentId,
    studentId, 
  }));
};

  return (
    <>
    <div className='flex items-center justify-between'>
            <div className='font-nunito-sans text-size6 font-bold mt-5'>{student.name}</div>
            <PrimaryButton text ="Add Payment"/>
    </div>
    <div className='flex items-center justify-between mt-5'>
            <PrimaryButton text ="Download"/>
    </div>
    
    <div className="overflow-x-auto mt-5">
      <table className="table w-full">
        <thead>
          <tr className="border-b-2 border-ascend-gray3">
            <th>Payment method</th>
            <th>Payment transaction ID</th>
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

    </>
  )
}

export default PaymentHistoryPage;
