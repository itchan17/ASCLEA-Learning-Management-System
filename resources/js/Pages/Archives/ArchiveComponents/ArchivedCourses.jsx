import React from "react";
import useArchives from "../../../Stores/Archives/archivedStore";
import ArchivedCourseCard from "./ArchivedCourseCard";

export default function ArchivedCourses() {
    const archivedCourseList = useArchives((state) => state.archivedCourseList);

    return (
        <div className="font-nunito-sans space-y-5">
            <h1 className="text-size6 font-bold">Archived Courses</h1>
            <div className="w-full flex flex-wrap gap-5">
                {archivedCourseList?.length > 0 ? (
                    archivedCourseList.map((course) => {
                        return (
                            <ArchivedCourseCard
                                key={course.id}
                                courseId={course.id}
                                courseCode={course.courseCode}
                                courseName={course.courseName}
                                courseDescription={course.courseDescription}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Nothing to see here… yet! Add some content to get going.”`}
                    />
                )}
            </div>
        </div>
    );
}
