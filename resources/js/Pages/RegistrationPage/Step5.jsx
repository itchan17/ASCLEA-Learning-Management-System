import React from 'react'

const Step5 = () => {
  return (
    <div className="mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg">
      <h3 className="text-size3 mb-4 font-semibold text-left text-black">Enrollment Policy</h3>
      <div className="text-size1 mb-4 text-left text-black">
        I promise to abide by the rules and regulations of the center.
        I understand that down payment and enrolment fees are NON-REFUNDABLE but are transferable within one (1) year period only.
      </div>
      <div className="flex items-center space-x-3 mb-4">
        <input type="checkbox" className="w-3 h-3 rounded-full border border-[#8A8989] " />
        <label className="text-size2">I acknowledge and agree to the enrollment policy</label>
      </div>  
     
      <h3 className="text-size3 mb-4 font-semibold text-left text-black">Enrollment Terms and Condition</h3>
      <div className="text-size1 mb-4 text-left text-black leading-relaxed space-y-2">
        1. This agreement informs you of the impacts and financial obligations that exist after you register for review.<br /> 
        2. When you register for a review, you enter into a financial obligation with ASCEND Tutorial, Training and Review Center. This Obligation holds regardless of attendance, receipt or financial aid or third- party funding.<br />
        3. One thousand minimum down payment is required. The remaining balance will be divided in four payment schedules equivalent to two months (every 15th and 30th of the month).<br />
        4. Tuition includes the review fee and materials fee.<br />
        5. Total fees vary depending on the program, discounts and promo being availed.<br />
        6. Once you enroll under the installment scheme, you will receive a monthly statement of account stating your due balance for the month. The SOA will be given a week before your due date.<br />
        7. You are expected to pay your tuition fee on the date provided in the statement of account.<br />
        8. NO refund is allowed but the tuition is transferable to other bearer. Transfer is good only for one year which begins from the day of enrollment.<br />
        9. Not attending the review does not entitle a refund.<br />
        10. Review materials are completely given only to those who have made full payment. Review materials for those in the installment mode will be given on a weekly basis until such that all have been given. <br />
        11. Certificate of Enrollment will be issued upon request only. All dues must be paid. Otherwise, no certificate will be issued.<br />
        12. Specialization is given FREE for areas with 5 and above enrollees. The number of sessions depends on the population of the enrollees. Regardless of whether the specialization is conducted or not, materials will still be given. Tuition remains fixed.<br />
        13. Mock examination results will be released only upon settlement of remaining balance. Once your balance is paid in full, all holds are released and access to your results returns normal.<br />
      </div>
        <div className="flex items-center space-x-3 mb-4">
            <input type="checkbox" className="w-3 h-3 rounded-full border border-[#8A8989] " />
            <label className="text-size2">By enrolling in review class, I certify that I agree to the term and conditions</label>
        </div>

    </div>
      
 








  )
}

export default Step5;