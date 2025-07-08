import React, { useState } from "react";
import usePeopleStore from "../../../../../../../Stores/Programs/peopleStore";
import { IoSearch } from "react-icons/io5";
import BackButton from "../../../../../../../Components/Button/BackButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { handleClickBackBtn } from "../../../../../../../Utils/handleClickBackBtn";
import { IoCaretDownOutline } from "react-icons/io5";
import { Pie } from "react-chartjs-2";
import { RiFeedbackFill } from "react-icons/ri";
import StudentQuizDetails from "./StudentQuizDetails";
import ViewEvidence from "./ViewEvidence";

export default function QuizReponses({ responsesData }) {
    console.log(responsesData);
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="flex items-center w-full justify-between">
                <div className="flex">
                    <BackButton doSomething={handleClickBackBtn} />
                </div>

                {/* Download button */}
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

            {/* Summary */}
            <div className="space-y-5">
                <h1 className="text-size5 break-words font-semibold">
                    Summary
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                88%
                            </h1>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Average Score
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                2hrs
                            </h1>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Average TIme
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                125/150
                            </h1>
                        </div>

                        <span className="text-size4 text-ascend-gray2">
                            (83%)
                        </span>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Highest Score
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                98/150
                            </h1>
                        </div>

                        <span className="text-size4 text-ascend-gray2">
                            (65%)
                        </span>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Lowest Score
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frequently Missed Questions */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-size5 break-words font-semibold">
                        Frequently Missed Questions
                    </h1>
                    <span className="cursor-pointer hover:text-ascend-blue transition-all duration-300 text-nowrap hover:underline">
                        See more
                    </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="flex justify-center col-span-1 lg:p-10">
                        <Pie
                            data={{
                                labels: [
                                    `Question no. 21`,
                                    `Question no. 2`,
                                    `Question no. 10`,
                                    `Question no. 13`,
                                    `Question no. 18`,
                                ],
                                datasets: [
                                    {
                                        data: [72, 68, 66, 55, 43],
                                        backgroundColor: [
                                            "#00a600",
                                            "#f9a502",
                                            "#f514bc",
                                            "#01007d",
                                            "#c51919",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        ></Pie>
                    </div>

                    <ol className="md:col-span-1 lg:col-span-2 space-y-10 flex flex-col justify-center items-center">
                        <li className="flex items-start space-x-4 w-full">
                            <div className="bg-ascend-green w-5 h-5 shrink-0 mt-1"></div>
                            <p className="text-gray-700">
                                Teacher A avoids giving out-of-context drills.
                                Instead, he makes use of real-world problems for
                                his students to solve. Doing so makes Teacher
                                A’s approach more meaningful and relevant.
                            </p>
                        </li>
                        <li className="flex items-start space-x-4 w-full">
                            <div className="bg-ascend-yellow w-5 h-5 shrink-0 mt-1"></div>
                            <p className="text-gray-700">
                                In the 4A's of facilitating learning, the first
                                thing that a teacher should do is:
                            </p>
                        </li>
                        <li className="flex items-start space-x-4 w-full">
                            <div className="bg-ascend-pink w-5 h-5 shrink-0 mt-1"></div>
                            <p className="text-gray-700">
                                In the 4A's approach to facilitating learning,
                                the students learn best to relate ideas to real
                                life through
                            </p>
                        </li>
                        <li className="flex items-start space-x-4 w-full">
                            <div className="bg-ascend-blue w-5 h-5 shrink-0 mt-1"></div>
                            <p className="text-gray-700">
                                Which test measure is basic to select and
                                connect ideas?
                            </p>
                        </li>
                        <li className="flex items-start space-x-4 w-full">
                            <div className="bg-ascend-red w-5 h-5 shrink-0 mt-1"></div>
                            <p className="text-gray-700">
                                Which test a subjective and less reliable for
                                scoring and grading?
                            </p>
                        </li>
                    </ol>
                </div>
            </div>

            {/* Feedback */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-end space-x-3">
                        <h1 className="text-size5 break-words font-semibold">
                            Feedback
                        </h1>
                        <span className="text-size3 text-ascend-gray3 mb-[2px]">
                            AI Generated
                        </span>
                    </div>
                    <PrimaryButton
                        icon={<RiFeedbackFill />}
                        text={"Generate Feedback"}
                    />
                </div>
                <div className="space-y-2">
                    <h1 className="text-size3 break-words font-semibold">
                        Performance Analysis
                    </h1>
                    <p className="text-justify">
                        The class performed well overall, achieving an average
                        score of 88%. Time spent was consistent at 2.5 hours,
                        suggesting that most students worked through the exam at
                        a steady pace. The score range—from 98/150 (65%) to
                        125/150 (83%)—indicates moderate variation in mastery.
                        However, several commonly missed questions pointed to
                        conceptual gaps. Notably, students struggled to
                        distinguish between subjective and objective
                        assessments, often misidentifying tools like concept
                        mapping as objective when they are typically used for
                        exploratory or reflective tasks. There was also frequent
                        confusion between instructional approaches—especially
                        differentiating between reflective and inquiry-based
                        methods.
                    </p>
                </div>
                <div className="space-y-2">
                    <h1 className="text-size3 break-words font-semibold">
                        Suggestions
                    </h1>
                    <p className="text-justify">
                        To improve conceptual clarity, conduct targeted reviews
                        focused on assessment types and pedagogical frameworks.
                        Use side-by-side comparison charts to contrast
                        reflective, inquiry-based, and constructivist
                        approaches. Reinforce assessment method distinctions
                        with scenario-based quizzes and group activities. For
                        example, ask students to match classroom situations to
                        appropriate teaching strategies or assessment tools.
                        Additionally, providing exemplars of objective (e.g.,
                        matching, multiple-choice) vs. subjective (e.g., essays,
                        portfolios) formats can help clarify misunderstandings.
                        These strategies will reinforce key concepts and better
                        prepare students for practical application.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="flex items-center justify-end">
                <div className="w-full min-w-0">
                    <h1 className="text-size5 break-words font-semibold">
                        Student Scores
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
                                Time
                            </th>
                            <th className="text-ascend-black font-black">
                                Score
                            </th>
                            <th className="text-ascend-black font-black">
                                Warnings
                            </th>
                            <th className="text-ascend-black font-black"></th>
                        </tr>
                    </thead>
                    {peopleList?.length > 0 && (
                        <tbody>
                            {peopleList.map((p, index) => (
                                <tr
                                    onClick={() => {
                                        setIsDetailsOpen(true);
                                    }}
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
                                    <td>2.5 hrs</td>
                                    <td>119/150</td>
                                    <td className="text-ascend-red">6</td>
                                    <td>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEvidenceOpen(true);
                                            }}
                                            className="hover:text-ascend-blue underline"
                                        >
                                            View detection results
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {isDetailsOpen && (
                    <StudentQuizDetails setIsDetailsOpen={setIsDetailsOpen} />
                )}

                {isEvidenceOpen && (
                    <ViewEvidence setIsEvidenceOpen={setIsEvidenceOpen} />
                )}
            </div>
        </div>
    );
}
