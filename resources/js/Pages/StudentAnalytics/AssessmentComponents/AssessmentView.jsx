import React from 'react'
import PrimaryButton from '../../../Components/Button/PrimaryButton'
import AssessmentCard from './AssessmentCard'
import TableStudent from './TableStudent'
import Table from './Table'

const AssessmentView = () => {
  return (
    <>
    <div className='flex flex-col justify-start'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='font-nunito-sans text-size7 font-bold'>Assessment Title</h1>
          <PrimaryButton
           text='Download' 
           />
        </div>
        <p className='font-nunito-sans text-size4 text-ascend-gray2 font-bold'>Course Title</p>
        <div className='border-t border-ascend-gray1 my-5'></div>
    </div>

    <div classNmae='flex flex-col justify-start '>
      <h1 className='font-nunito-sans text-size6 font-bold'>Overview</h1>
      <div className='flex flex-col justify-center items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-5'>
        <AssessmentCard value='88%' label='Total Questions' percentage=""/>
        <AssessmentCard value='2hrs' label='Total Questions' percentage=""/>
        <AssessmentCard value='125/150' label='Total Questions' percentage="82%"/>
        <AssessmentCard value='98/150' label='Total Questions' percentage="82%"/>
      </div>
    </div>

    <div className='flex flex-col justify-start mt-10'>
      <h1 className='font-nunito-sans text-size6 font-bold mb-10'>Students</h1>
      <TableStudent/>
    </div>


    
    
    
    
    
    </>
  )

}

export default AssessmentView;