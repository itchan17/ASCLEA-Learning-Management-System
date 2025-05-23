import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import useStudentStore from "../../../Stores/StudentAnalytics/StudentStore";


const StudentModal = ({id}) => {
  const assessmentStudent = useStudentStore((state) => state.studentList);
  const student = assessmentStudent.find(s => s.id === id);
  
  return (
    <dialog id="studentModal" className="modal">
      <div className="modal-box bg-white">
        <div className="flex flex-row justify-between items-center">
        <h3 className="font-nunito-sans font-bold text-size2">Details</h3>
        <AiOutlineClose />
        </div>
        <div className="flex flex-row justify-between items-center mt-3">

          <div className="flex items-center gap-3">
           <div className="w-20 h-20 bg-ascend-gray1 rounded-full"></div>
            <div className="flex flex-col ml-5">
              <p className="font-nunito-sans text-size4 font-bold">{student?.name || 'No name'}</p>
              <p className="font-nunito-sans text-size2 font-bold">{student?.email || 'No name'}</p>
            </div>
          </div>

          <div className="flex flex-col ml-auto">
            <p className="font-nunito-sans text-ascend-gray2 text-size4 font-bold">Rank</p>
            <p className="font-nunito-sans text-size7 font-bold">3</p>
          </div>
        </div>

        <div className="flex flex-col mt-5"> 
          <h1 className="font-nunito-sans text-ascend-gray2text-size4 font-bold">Score</h1>
          <p className="font-nunito-sans text-size7 font-bold">{student?.score || 'No name'}<span className='text-size4 font-nunito-sans '>(80%)</span></p>
        </div>
        <div className="flex flex-col mt-5"> 
          <h1 className="font-nunito-sans text-ascend-gray2 text-size4 font-bold">Time</h1>
          <p className="font-nunito-sans text-size7 font-bold">{student?.time || 'No name'}</p>
        </div>
        <div className="modal-action">  
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default StudentModal;