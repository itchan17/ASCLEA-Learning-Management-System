import React from 'react'
import Table from './AssessmentComponents/Table'


const Assessment = (programID) => {
  return (
    <>
    <div className='flex justify-start'>
        <h1 className='font-nunito-sans text-size6 font-bold'>Assessments</h1>
    </div>

    <Table />

    
    </>
  )
}

export default Assessment;