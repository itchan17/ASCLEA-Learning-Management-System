import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";

export default function ViewEvidence({ setIsEvidenceOpen, assessmentSubmissionId, studentData }) {
    const [cheatings, setCheatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const res = await fetch(`/detected-cheatings/${assessmentSubmissionId}`);
                if (!res.ok) throw new Error("Failed to fetch evidence");

                const data = await res.json();

                setCheatings(data.cheatings || []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvidence();
    }, [assessmentSubmissionId]);


    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/25 z-999 flex items-center justify-center font-nunito-sans">
                <div className="bg-ascend-white p-10 text-center text-size4 font-semibold">
                    Loading evidence...
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/25 z-999 flex items-center justify-center font-nunito-sans">
            <div className="bg-ascend-white opacity-100 p-5 w-200 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-size4 font-bold">Detected Cheating Evidence</h1>
                    <div
                        onClick={() => setIsEvidenceOpen(false)}
                        className="hover:bg-ascend-lightblue transition-all duration-300 p-1 rounded-4xl cursor-pointer"
                    >
                        <MdOutlineClose className="text-size5" />
                    </div>
                </div>

                {/* Student Info */}
                    <div className="flex flex-wrap gap-5 items-center justify-between">
                        <div className="flex items-center space-x-5">
                            <div className="w-20 h-20 bg-ascend-gray1 rounded-full shrink-0"></div>
                            <div>
                                <h1 className="text-size3 font-semibold">
                                    {studentData.first_name} {studentData.last_name}
                                </h1>
                                <span>{studentData.email}</span>
                            </div>
                        </div>

                        <div className="flex  space-x-[0.5px]">
                            <PrimaryButton text={"Download"} />
                            <div className="dropdown dropdown-end cursor-pointer ">
                                <button
                                    tabIndex={0}
                                    role="button"
                                    className="px-3 h-10 bg-ascend-blue hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                                >
                                    <div className="text-size1 ">
                                        {<IoCaretDownOutline />}
                                    </div>
                                </button>
                                <ul
                                    tabIndex={0}
                                    className="text-size2 dropdown-content menu space-y-2 font-medium bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                                >
                                    <li>
                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                            Download as PDF
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                            Download as CSV
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                

                {/* Cheating messages and screenshots */}
                {cheatings.map((item, index) => (
                    <div key={index}>
                        <span className="block mb-2">
                            {new Date(item.timestamp).toLocaleTimeString()} - {item.message}
                        </span>
                        {item.files && item.files.length > 0 ? (
                            item.files.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={file.file_path}
                                    alt={file.file_name}
                                    className="w-full max-h-[400px] object-contain bg-ascend-gray1 rounded-lg"
                                />
                            ))
                        ) : (
                            <div className="bg-ascend-gray1 w-full h-75 flex items-center justify-center text-ascend-gray3">
                                No screenshot available
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
