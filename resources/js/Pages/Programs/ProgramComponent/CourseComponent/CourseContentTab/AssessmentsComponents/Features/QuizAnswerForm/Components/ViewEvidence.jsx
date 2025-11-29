import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";
import ProfileImage from "../../../../../../../../../Components/ProfileImage";
import Loader from "../../../../../../../../../Components/Loader";

export default function ViewEvidence({
    setIsEvidenceOpen,
    assessmentSubmissionId,
    studentData,
}) {
    const [cheatings, setCheatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const res = await fetch(
                    `/detected-cheatings/${assessmentSubmissionId}`
                );
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
                <div className="bg-ascend-white w-200 p-10 max-h-[calc(100vh-5rem)] text-center text-size4 font-semibold">
                    <Loader color="text-ascend-blue" />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/25 z-999 flex items-center justify-center font-nunito-sans">
            <div className="bg-ascend-white opacity-100 p-5 w-200 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-size4 font-bold">
                        Suspicious Activity Evidence
                    </h1>
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
                        <ProfileImage
                            userData={studentData}
                            profileImageSize={"w-20 h-20"}
                            textSize={"text-size7"}
                        />

                        <div>
                            <h1 className="text-size3 font-semibold">
                                {studentData.first_name} {studentData.last_name}
                            </h1>
                            <span>{studentData.email}</span>
                        </div>
                    </div>
                </div>

                {/* Cheating messages and screenshots */}
                {cheatings.map((item, index) => (
                    <div key={index}>
                        <span className="block mb-2">
                            {new Date(item.timestamp).toLocaleTimeString()} -{" "}
                            {item.message}
                        </span>
                        {item.files && item.files.length > 0 ? (
                            item.files.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={file.file_path}
                                    alt={file.file_name}
                                    className="w-full max-h-[400px] object-contain bg-ascend-gray1"
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
