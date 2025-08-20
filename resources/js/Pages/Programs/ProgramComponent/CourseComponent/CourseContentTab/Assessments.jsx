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

export default function Assessments() {
    const { course, program } = usePage().props;

    // console.log(`COurrentPage: ${currentPage} LastPage: ${lastPage}`);
    // Assessments Store
    // const isFormOpen = useAssessmentsStore((state) => state.isFormOpen);
    // const toggleAssessmentForm = useAssessmentsStore(
    //     (state) => state.toggleAssessmentForm
    // );
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);
    const setAssessmentList = useAssessmentsStore(
        (state) => state.setAssessmentList
    );

    const addToAssessmentList = useAssessmentsStore(
        (state) => state.addToAssessmentList
    );

    const page = useAssessmentsStore((state) => state.page);
    const hasMore = useAssessmentsStore((state) => state.hasMore);
    const setPagination = useAssessmentsStore((state) => state.setPagination);

    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);
    const [initalLastPage, setInitalLastPage] = useState(null);

    useEffect(() => {
        console.log(`PAGE: ${page} HASMORE: ${hasMore}`);
    }, [page, hasMore]);

    // useEffect(() => {
    //     if (currentPage === 1) {
    //         setAssessmentList([...assessments]);
    //     } else {
    //         const assmnts = [...assessmentList, ...assessments];
    //         // Map handle remove duplicate values based on the assessment id
    //         const uniqueAssessments = [
    //             ...new Map(assmnts.map((a) => [a.assessment_id, a])).values(),
    //         ];

    //         setAssessmentList(uniqueAssessments);
    //     }
    // }, [assessments]);

    const targetForm = useRef(null);

    // Scroll into the form once opened
    useEffect(() => {
        if (isAssessmentFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isAssessmentFormOpen]);

    const toggleAssessmentForm = () => {
        setIsAssessmentFormOpen(!isAssessmentFormOpen);
    };

    // useEffect(() => {
    //     console.log(assessments);
    //     console.log(assessmentList);
    // }, [assessmentList]);

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

            setPagination(pageNum, hasMoreAssessment);

            setIsLoading(false);
        } catch (error) {
            console.error(error);
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

            {hasMore && assessmentList.length > 0 && (
                <div ref={loaderRef} className=" w-full flex justify-center">
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {assessmentList.length === 0 && !isLoading && (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )}
            {/* {currentPage < lastPage && (
                <WhenVisible
                    params={{
                        data: {
                            page: currentPage + 1,
                        },
                        preserveUrl: true,
                        preserveScroll: false,
                        only: ["assessments"],
                    }}
                    always
                >
                    <div className=" w-full flex justify-center">
                        <Loader color="bg-ascend-blue" />
                    </div>
                </WhenVisible>
            )} */}
        </div>
    );
}
