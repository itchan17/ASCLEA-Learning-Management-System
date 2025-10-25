import React from 'react'
import BackButton from '../../../Components/Button/BackButton';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import useEnrolledStore from "../../../Stores/Admission/EnrolledStore";
import { usePage } from '@inertiajs/react'
import DataFormFields from './DataFormFields';
import CoursesTable from "./CoursesTable";
import AssesstmentTable from './AssesstmentTable';
import { useState } from 'react';


const StudentInfo = () => {
    const { props } = usePage();
    const studentid = props.studentid;
    
    const [isEditDisabled, setIsEditDisabled] = useState(true);

    const enrolledList = useEnrolledStore((state) => state.enrolledList);

    const student = enrolledList.find((item) => item.id === Number(studentid));

  return (
    <>
    <div className='justify-between flex items-center'>
        <BackButton doSomething={() => {window.history.back()}} />

        {!isEditDisabled ? (
            <PrimaryButton
                text="Archive"
                btnColor="bg-ascend-red"
            />
        ) : (
        <PrimaryButton
            text="Delete"
            btnColor="bg-ascend-red"
        />
        )}
    </div>
    
    <div className='justify-start flex items-center mt-5'>
        <div className="w-18 h-18 bg-ascend-gray1 rounded-full"></div>
        <div className='flex flex-col ml-2'>
            <div className='flex items-center'>
                <div className='font-nunito-sans text-size4 ml-5 font-bold'>{student.first_name} {student.last_name}</div>
                <div className={`font-nunito-sans text-size2 ml-2 text-ascend-white ${student.status === 'Enrolled' ? 'bg-ascend-blue' : student.status === 'Drop' ? 'bg-ascend-red' : 'bg-ascend-yellow'} px-3`}>{student.status}</div>
            </div>
            <div className='font-nunito-sans text-size2 ml-5'>Student</div>
        </div>
    </div>

    <div className='mt-5 justify-between flex items-center'>
        <div className='font-nunito-sans text-size2'>Approved enrollment by: Name</div>
    </div>
       
    <div className='mt-5'>
        <DataFormFields
        student={student}
        setIsEditDisabled={setIsEditDisabled}
        isEditDisabled={isEditDisabled}
        />
    </div>
    <div className='mt-10'>
        <CoursesTable student={student} />
    </div>
    <div className='mt-10'>
        <AssesstmentTable student={student} />
    </div>
    
    </>
  )
}

export default StudentInfo;