import React from 'react'
import BackButton from "../../../Components/Button/BackButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { useState } from 'react';
import ApprovalModal from './ApprovalModal';
import RejectionModal from './RejectionModal';
import usePendingStore from "../../../Stores/Admission/ApplicantStore";
import { usePage } from '@inertiajs/react'

const EnrollmentRequest = () => {
    const { props } = usePage();
    const applicantId = props.applicantId;

    const pendingList = usePendingStore((state) => state.pendingList);

    const applicant = pendingList.find((item) => item.id === Number(applicantId));

    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);

    const toggleModalApprove = () => {
        setIsModalOpenApprove(!isModalOpenApprove);
    };

    const toggleModalReject = () => {
        setIsModalOpenReject(!isModalOpenReject);
    };

  return (
    <>
    <div className='justify-between flex items-center'>
        <BackButton 
        doSomething={() => {window.history.back()}} 
        />

        <div className='flex space-x-3'>
            <PrimaryButton
            text="Reject"
            btnColor="bg-ascend-red"
            textColor="text-white"
            doSomething={toggleModalReject}
            />
            <PrimaryButton
            text="Approve"
            btnColor="bg-ascend-blue"
            textColor="text-white"
            className="ml-3"
            doSomething={toggleModalApprove}
            />
        </div>
    </div>

    <div className='pl-4'>
    <div className='font-nunito-sans text-size6 font-bold mt-5'>Program Enrollment Request</div>
       <div className="mt-5 w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <div className="font-nunito-sans text-size3 font-bold">Full Name</div>
                    <div className="font-nunito-sans text-size3 mt-3">{applicant.name}</div>
                </div>
                <div>
                    <div className="font-nunito-sans text-size3 font-bold">Program Applied For</div>
                    <div className="font-nunito-sans text-size3 mt-3">{applicant.program}</div>
                </div>
                <div>
                    <div className="font-nunito-sans text-size3 font-bold mt-5">Address</div>
                    <div className="font-nunito-sans text-size3 mt-3">{applicant.address}</div>
                </div>
                <div>
                    <div className="font-nunito-sans text-size3 font-bold mt-5">Date of Application</div>
                    <div className="font-nunito-sans text-size3 mt-3">{applicant.date_applied}</div>
                </div>
        </div>
    <div className='mt-6'>
         <div className='font-nunito-sans text-size6 font-bold mt-5'>Attached Files</div>
    </div>

    </div>

    {isModalOpenApprove && <ApprovalModal toggleModal={toggleModalApprove} />}
    {isModalOpenReject && <RejectionModal toggleModal={toggleModalReject} />}

    </>
  )
}

export default EnrollmentRequest;