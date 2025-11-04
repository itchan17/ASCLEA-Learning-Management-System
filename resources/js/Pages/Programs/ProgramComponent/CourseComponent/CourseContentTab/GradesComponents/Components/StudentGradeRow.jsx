import React from "react";
import useGrades from "../Hooks/useGrades";
import { usePage } from "@inertiajs/react";
import { capitalize } from "lodash";

export default function StudentGradeRow({ student }) {
    const { program, course } = usePage().props;

    const { handleGradeChange, isLoading, grade, isChanged } = useGrades({
        programId: program.program_id,
        courseId: course.course_id,
        assignedCourseId: student.assigned_course_id,
        initialGrade: student.grade ? student.grade.grade || "" : "",
    });

    return (
        <tr className="hover:bg-ascend-lightblue">
            <td>
                <input
                    type="checkbox"
                    className="accent-ascend-blue w-4 h-4 cursor-pointer"
                />
            </td>
            <td>
                <p className="font-bold">{student.last_name}</p>
            </td>
            <td>
                <p className="font-bold">{student.first_name}</p>
            </td>
            <td>
                {student.grade ? (
                    <p
                        className={
                            student.grade.status === "graded"
                                ? "text-ascend-blue"
                                : "text-ascend-green"
                        }
                    >
                        {capitalize(student.grade.status)}
                    </p>
                ) : (
                    <p className="text-ascend-yellow">No grade</p>
                )}
            </td>
            <td>{student.email}</td>
            <td>
                <div className="space-x-2 flex flex-nowrap items-center">
                    <input
                        className="w-16 border h-9 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="number"
                        min={0}
                        max={999}
                        value={grade}
                        onKeyDown={(e) => {
                            if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "+"
                            ) {
                                e.preventDefault(); // prevent invalid characters
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (Number(value) <= 999) {
                                handleGradeChange(value);
                            }
                        }}
                    />

                    {isChanged && (
                        <span className="text-nowrap ml-3">
                            {isLoading ? "Saving" : "Saved"}
                        </span>
                    )}
                </div>
            </td>
        </tr>
    );
}
