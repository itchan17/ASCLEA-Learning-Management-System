import React from "react";
import usePeopleStore from "../../../../../../../Stores/Programs/peopleStore";
import { IoSearch } from "react-icons/io5";
import BackButton from "../../../../../../../Components/Button/BackButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { handleClickBackBtn } from "../../../../../../../Utils/handleClickBackBtn";
import { IoCaretDownOutline } from "react-icons/io5";

export default function ActivityReponses({ responsesData }) {
    console.log(responsesData);
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);
    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="flex items-center w-full justify-between">
                <div className="flex">
                    <BackButton doSomething={handleClickBackBtn} />
                </div>

                <PrimaryButton text={"Post Grades"} />
            </div>
            <div className="w-full min-w-0">
                <h1 className="text-size6 break-words font-semibold">
                    {responsesData.assessmentTitle}
                </h1>
                <div className="space-x-5">
                    <span className="font-medium">
                        Possible Points: {responsesData.assessmentPoints}
                    </span>
                    <span className="font-medium">
                        Response Received: {responsesData.responseReceived}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-end">
                <div className="w-full min-w-0">
                    <h1 className="text-size5 break-words font-semibold">
                        Student Outputs
                    </h1>
                </div>
                <div className="relative">
                    <input
                        className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search name"
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                Status
                            </th>
                            <th className="text-ascend-black font-black">
                                Date of Submission
                            </th>
                            <th className="text-ascend-black font-black">
                                Outputs
                            </th>
                            <th className="text-ascend-black font-black">
                                Grade
                            </th>
                        </tr>
                    </thead>
                    {peopleList?.length > 0 && (
                        <tbody>
                            {peopleList.map((p, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl shrink-0"></div>

                                            <div className="font-bold">
                                                {p.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-ascend-green font-bold">
                                        Submitted
                                    </td>
                                    <td>2025-05-12</td>
                                    <td>File name.pdf</td>
                                    <td>
                                        <input
                                            className="w-12 border h-9 p-2 border-ascend-black focus:outline-ascend-blue"
                                            type="number"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {peopleList?.length === 0 && (
                    <EmptyState
                        paddingY="py-0"
                        imgSrc={"/images/illustrations/grades.svg"}
                        text={`“Oops! No one to hand an A+ to. Add your first student to get started.”`}
                    />
                )}
            </div>
            <div className="flex  space-x-[0.5px]">
                <PrimaryButton text={"Download"} />

                {/* Dropdown button */}
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
    );
}
