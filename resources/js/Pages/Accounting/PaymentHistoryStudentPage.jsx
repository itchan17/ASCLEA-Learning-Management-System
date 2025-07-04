import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import PrimaryButton from '../../Components/Button/PrimaryButton';
import PaymentTable from './StudentPaymentHistory/PaymentTable';
import StudentPaymentInfo from './StudentPaymentHistory/StudentPaymentInfo';

const PaymentHistoryStudentPage = () => {
  return (
    <>
      {/* Add your content here */}
      <div className="font-nunito-sans text-size6 font-bold">Mika Tan</div>
      <PaymentTable />
    </>
  );
}

export default PaymentHistoryStudentPage;
