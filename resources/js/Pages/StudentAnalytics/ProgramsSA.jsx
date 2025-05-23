import React from 'react'
import { useState, useEffect } from "react";
import ProgramSACard from "./ProgramSAcomponents/ProgramSAcard";
import EmptyState from "../../Components/EmptyState/EmptyState";

export const ProgramsSA = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

  return (
        <>
            <div className="font-nunito-sans space-y-5">
                <h3 className='font-nunito-sans text-size6 text-black font-bold'>Select Program</h3>
                {/* Program placeholder */}
                <div className="w-full flex flex-wrap gap-5">
                    <ProgramSACard
                        ProgramID={1}
                        programName={"Licensure Examination for Teacher"}
                    />

                    <ProgramSACard
                        ProgramID={2}
                        programName={"Certificate in Teaching Program"}
                    />
                    
                </div>

            </div>
        </>
    );
}

export default ProgramsSA;