import { useState, useRef, useEffect, useCallback } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import AssessmentForm from "./AssessmentsComponents/AssessmentForm";
import AssessmentItem from "./AssessmentsComponents/AssessmentItem";
import useAssessmentsStore from "../../../../../Stores/Programs/CourseContent/assessmentsStore";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";
import { usePage, WhenVisible } from "@inertiajs/react";
import Loader from "../../../../../Components/Loader";
import axios from "axios";
import { route } from "ziggy-js";
import { displayToast } from "../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../Components/CustomToast/DefaultCustomToast";

export default function Assessments() {
    const { course, program } = usePage().props;

    // Assessment Store
    const assessmentByCourse = useAssessmentsStore(
        (state) => state.assessmentByCourse
    );
    const setAssessments = useAssessmentsStore((state) => state.setAssessments);
    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);

    // States related for fetching data and inifnite scrolling
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);
    const targetForm = useRef(null); // use to reference the loader

    // Scroll into the form once opened
    useEffect(() => {
        if (isAssessmentFormOpen) {
            targetForm.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isAssessmentFormOpen]);

    const toggleAssessmentForm = () => {
        setIsAssessmentFormOpen(!isAssessmentFormOpen);
    };

    const fetchAssessments = async () => {
        setIsLoading(true);

        try {
            let response;
            let pageNum;
            let assessmentList;

            if (!assessmentByCourse[course.course_id]) {
                response = await axios.get(
                    route("program.course.assessments", {
                        program: program.program_id,
                        course: course.course_id,
                        _query: {
                            page: 1,
                        },
                    })
                );

                pageNum = 2;
                assessmentList = response.data.data;
            } else {
                response = await axios.get(
                    route("program.course.assessments", {
                        program: program.program_id,
                        course: course.course_id,
                        _query: {
                            page: assessmentByCourse[course.course_id].page,
                        },
                    })
                );

                pageNum = assessmentByCourse[course.course_id].page + 1;
                assessmentList = [
                    ...assessmentByCourse[course.course_id].list,
                    ...response.data.data,
                ];
            }

            const hasMoreAssessment =
                response.data.current_page < response.data.last_page;

            setAssessments(
                course.course_id,
                assessmentList,
                pageNum,
                hasMoreAssessment
            );
        } catch (error) {
            console.error(error);

            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please reload the page."}
                />,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];

            if (target.isIntersecting && !isLoading) {
                fetchAssessments();
            }
        },
        [isLoading]
    );

    useEffect(() => {
        // Create the observer function
        // Reset and re-create whenever there are changes in dependecies
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "100px",
            threshold: 0,
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            observer.disconnect();
        };
    }, [handleObserver]);

    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Assessments</h1>

                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <PrimaryButton
                        isDisabled={isAssessmentFormOpen}
                        doSomething={toggleAssessmentForm}
                        text="Add Assessment"
                    />
                </RoleGuard>
            </div>

            {isAssessmentFormOpen && (
                <div ref={targetForm}>
                    <AssessmentForm toggleForm={toggleAssessmentForm} />
                </div>
            )}

            {/* <AssessmentItem /> */}
            {assessmentByCourse[course.course_id] &&
                assessmentByCourse[course.course_id].list.length > 0 &&
                assessmentByCourse[course.course_id].list.map(
                    (assessment, i) => (
                        <AssessmentItem
                            setIsAssessmentFormOpen={setIsAssessmentFormOpen}
                            key={assessment.assessment_id}
                            assessmentDetails={assessment}
                        />
                    )
                )}

            {/* Display loader if assessment list for the course  has no value or has more */}
            {(!assessmentByCourse[course.course_id] ||
                assessmentByCourse[course.course_id].hasMore) && (
                <div ref={loaderRef} className=" w-full flex justify-center">
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {assessmentByCourse[course.course_id] &&
                assessmentByCourse[course.course_id].list.length === 0 &&
                !assessmentByCourse[course.course_id].hasMore && (
                    <EmptyState
                        imgSrc={"/images/illustrations/empty.svg"}
                        text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                    />
                )}
        </div>
    );
}
