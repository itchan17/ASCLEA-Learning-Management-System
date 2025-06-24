import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import usePaymentStore from "../../../Stores/Accounting/PaymentStore";
import useAccountingStore from "../../../Stores/Accounting/AccountingStore";
import BackButton from "../../../Components/Button/BackButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";

const PaymentInfo = () => {
  const { props } = usePage();
  const paymentId = props.paymentId;
  const studentId = props.studentId;

  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [formData, setFormData] = useState({
    payment_method: '',
    transaction_id: '',
    receipt_date: '',
    amount: ''
  });

  const PaymentList = usePaymentStore((state) => state.PaymentList);
  const AccountingList = useAccountingStore((state) => state.AccountingList);

  const payment = PaymentList.find((item) => item.id === Number(paymentId));
  const account = AccountingList.find((student) => Number(student.id) === Number(studentId));

  const defaultFormData = {
  payment_method: payment?.payment_method || '', transaction_id: payment?.transaction_id || '', receipt_date: payment?.receipt_date || '', amount: payment?.amount || ''
};

  useEffect(() => {
    setFormData(defaultFormData);
  }, [payment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditDisabled(true);
  };

  const handleCancel = () => {
    setFormData(defaultFormData);
    setIsEditDisabled(true);
  };

  return (
    <>
      {/* Top Buttons */}
      <div className='justify-between flex items-center'>
        <BackButton doSomething={() => window.history.back()} />
        {!isEditDisabled ? (
          <PrimaryButton text="Archive" btnColor="bg-ascend-red" />
        ) : (
          <PrimaryButton text="Delete" btnColor="bg-ascend-red" />
        )}
      </div>

      {/* Avatar & Name */}
      <div className='justify-start flex items-center mt-5'>
        <div className="w-18 h-18 bg-ascend-gray1 rounded-full" />
        <div className='flex flex-col ml-2'>
          <div className='flex items-center'>
            <div className='font-nunito-sans text-size4 ml-5 font-bold'>
              {account ? account.name : 'Unknown'}
            </div>
            <div className="font-nunito-sans text-size2 ml-2 text-ascend-white bg-ascend-blue px-3">Active</div>
          </div>
          <div className='font-nunito-sans text-size2 ml-5'>Student</div>
        </div>
      </div>

      {/* Edit, Save, Cancel Buttons */}
      <div className='flex justify-end items-center mt-5'>
        {isEditDisabled ? (
          <PrimaryButton text="Edit" btnColor="bg-ascend-blue" doSomething={() => setIsEditDisabled(false)}/>
        ) : (
          <div className='flex gap-3'>
            <SecondaryButton text="Cancel" btnColor="bg-ascend-red" doSomething={handleCancel} />
            <PrimaryButton text="Save" btnColor="bg-ascend-blue" doSomething={handleSave} />
          </div>
        )}
      </div>

      {/* Payment Details Form */}
      <form autoComplete="off">
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5'>
          <div className='flex flex-col'>
            <label className='font-nunito-sans text-size2 text-ascend-black'>Payment Method</label>
            <input type="text" name="payment_method" disabled={isEditDisabled} value={formData.payment_method} onChange={handleChange}
              className={`border px-3 py-2 ${isEditDisabled ? 'text-ascend-gray1' : ''} border-ascend-gray1 focus:outline-ascend-blue`}
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-nunito-sans text-size2 text-ascend-black'>Transaction ID</label>
            <input type="text" name="transaction_id" disabled={isEditDisabled} value={formData.transaction_id} onChange={handleChange}
              className={`border px-3 py-2 ${isEditDisabled ? 'text-ascend-gray1' : ''} border-ascend-gray1 focus:outline-ascend-blue`}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5'>
          <div className='flex flex-col'>
            <label className='font-nunito-sans text-size2 text-ascend-black'>Receipt Date</label>
            <input type="date" name="receipt_date" disabled={isEditDisabled} value={formData.receipt_date} onChange={handleChange}
              className={`border px-3 py-2 ${isEditDisabled ? 'text-ascend-gray1' : ''} border-ascend-gray1 focus:outline-ascend-blue`}
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-nunito-sans text-size2 text-ascend-black'>Amount</label>
            <input type="number" name="amount" disabled={isEditDisabled} value={formData.amount} onChange={handleChange}
              className={`border px-3 py-2 ${isEditDisabled ? 'text-ascend-gray1' : ''} border-ascend-gray1 focus:outline-ascend-blue`} />
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentInfo;
