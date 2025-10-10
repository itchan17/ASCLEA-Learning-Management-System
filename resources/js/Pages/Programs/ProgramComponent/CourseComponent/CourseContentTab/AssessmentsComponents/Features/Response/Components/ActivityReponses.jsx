import React from "react";
import usePeopleStore from "../../../../../../../../../Stores/Programs/peopleStore";
import { IoSearch } from "react-icons/io5";
import BackButton from "../../../../../../../../../Components/Button/BackButton";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { handleClickBackBtn } from "../../../../../../../../../Utils/handleClickBackBtn";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import { capitalize } from "lodash";
import { formatDueDateTime } from "../../../../../../../../../Utils/formatDueDateTime";
import Pagination from "../../../../../../../../../Components/Pagination";
import ResponseAttachedFiles from "./ResponseAttachedFiles";

export default function ActivityReponses() {
    const { assessment, responses, responsesCount } = usePage().props;
    console.log(responses);
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
                    First activity
                </h1>
                <div className="space-x-5">
                    <span className="font-medium">
                        Total Points: {assessment.total_points}
                    </span>
                    <span className="font-medium">
                        Responses Received: {responsesCount}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-between">
                <h1 className="text-size5 break-words font-semibold">
                    Student Outputs
                </h1>

                <div className="flex flex-wrap w-full sm:w-fit gap-2">
                    <select
                        className={`textField border w-full sm:w-40 px-3 py-2  focus:outline-ascend-blue`}
                    >
                        <option value="">Submitted</option>
                        <option value="graded">Graded</option>
                        <option value="returned">Returned</option>
                    </select>
                    <div className="relative w-full sm:w-60">
                        <input
                            className="border w-full pl-10 pr-3 py-2 border-ascend-black focus:outline-ascend-blue"
                            type="text"
                            placeholder="Search name"
                        />
                        <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="w-0">
                                <div className="flex items-center mb-0 gap-2 text-ascend-black font-black">
                                    <input
                                        type="checkbox"
                                        className="accent-ascend-blue w-4 h-4"
                                    />
                                    <span>Select all</span>
                                </div>
                            </th>

                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                Status
                            </th>
                            <th className="text-ascend-black font-black">
                                <div className="flex space-x-1 items-center hover:bg-ascend-lightblue transition-all duration-300 w-fit p-2 cursor-pointer">
                                    <p>Date of submission</p>

                                    <span className="text-size4 ">
                                        <FaSort />
                                    </span>
                                </div>
                            </th>

                            <th className="text-ascend-black font-black">
                                Grade
                            </th>
                        </tr>
                    </thead>
                    {responses.data.length > 0 && (
                        <tbody>
                            {responses.data.map((response, index) => (
                                <>
                                    <tr
                                        key={index}
                                        className="hover:bg-ascend-lightblue cursor-pointer"
                                    >
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue w-4 h-4"
                                            />
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl shrink-0"></div>
                                                <div className="font-bold">
                                                    {
                                                        response.submitted_by
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        response.submitted_by
                                                            .last_name
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {capitalize(
                                                response.submission_status
                                            )}
                                        </td>
                                        <td>
                                            {formatDueDateTime(
                                                response.submitted_at
                                            )}
                                        </td>
                                        <td className="space-x-2 flex items-center flex-nowrap">
                                            <input
                                                type="number"
                                                className="w-12 h-8 p-2 border border-ascend-black focus:outline-ascend-blue appearance-none"
                                            />
                                            <span className="text-nowrap">
                                                / {assessment.total_points}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* extra row below */}
                                    {response.activityFiles &&
                                        response.activityFiles.length > 0 && (
                                            <ResponseAttachedFiles
                                                activityFiles={
                                                    response.activityFiles
                                                }
                                            />
                                        )}
                                </>
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
            <div className="flex flex-wrap-reverse items-center justify-between gap-5">
                <div className="flex space-x-[0.5px]">
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
                <div className="w-full sm:w-fit">
                    <Pagination
                        links={responses.links}
                        currentPage={responses.current_page}
                        lastPage={responses.last_page}
                        only={["responses"]}
                    />
                </div>
            </div>
        </div>
    );
}
