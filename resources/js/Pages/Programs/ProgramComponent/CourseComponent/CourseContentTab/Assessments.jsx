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
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);
    const addToAssessmentList = useAssessmentsStore(
        (state) => state.addToAssessmentList
    );
    const page = useAssessmentsStore((state) => state.page);
    const hasMore = useAssessmentsStore((state) => state.hasMore);
    const setPagination = useAssessmentsStore((state) => state.setPagination);

    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);

    // States related for fetching data and inifnite scrolling
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);
    const targetForm = useRef(null); // use to reference the loader

    // Scroll into the form once opened
    useEffect(() => {
        if (isAssessmentFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isAssessmentFormOpen]);

    const toggleAssessmentForm = () => {
        setIsAssessmentFormOpen(!isAssessmentFormOpen);
    };

    const fetchAssessments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                route("program.course.assessments", {
                    program: program.program_id,
                    course: course.course_id,
                    _query: {
                        page,
                    },
                })
            );
            console.log(response);

            addToAssessmentList(response.data.data);

            const pageNum = page + 1;
            const hasMoreAssessment =
                response.data.current_page < response.data.last_page;

            // Set the pagination using zustand
            // so it wont get reset whenver user navigate to another page
            // helps to preserve the state of loaded assessments
            setPagination(pageNum, hasMoreAssessment);

            setIsLoading(false);
        } catch (error) {
            console.error(error);

            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. PLease reload the page."}
                />,
                "error"
            );
            setIsLoading(false);
        }
    };

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];

            if (target.isIntersecting && !isLoading && hasMore) {
                fetchAssessments();
            }
        },
        [isLoading, hasMore]
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

    // This will be used to intially fetch the assessments
    // instead of using the observer
    useEffect(() => {
        fetchAssessments();
    }, []);

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
            {assessmentList.length > 0 &&
                assessmentList.map((assessment, i) => (
                    <AssessmentItem
                        setIsAssessmentFormOpen={setIsAssessmentFormOpen}
                        key={assessment.assessment_id}
                        assessmentDetails={assessment}
                    />
                ))}

            {/* Display only when assessmentList has value
            preventing to be displayed in inital render of component */}
            {hasMore && assessmentList.length > 0 && (
                <div ref={loaderRef} className=" w-full flex justify-center">
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {assessmentList.length === 0 && !hasMore && (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )}
        </div>
    );
}
