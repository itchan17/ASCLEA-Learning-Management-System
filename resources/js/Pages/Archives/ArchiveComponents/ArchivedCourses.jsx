import React from "react";
import useArchives from "../../../Stores/Archives/archivedStore";
import ArchivedCourseCard from "./ArchivedCourseCard";
import { usePage } from "@inertiajs/react";
import EmptyState from "../../../Components/EmptyState/EmptyState";

export default function ArchivedCourses() {
    const archivedCourseList = useArchives((state) => state.archivedCourseList);
    const { archivedCourses } = usePage().props;

    return (
        <div className="font-nunito-sans space-y-5">
            <h1 className="text-size6 font-bold">Archived Courses</h1>
            <div className="w-full flex flex-wrap gap-5">
                {archivedCourses.length > 0 ? (
                    archivedCourses.map((course) => {
                        return (
                            <ArchivedCourseCard
                                key={course.course_id}
                                courseData={course}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Looks empty! You haven’t archived any courses yet.”`}
                    />
                )}
            </div>
        </div>
    );
}
