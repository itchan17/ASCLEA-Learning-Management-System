import { useRef, useState, useCallback, useEffect } from "react";
import useAssessmentsStore from "./Stores/assessmentsStore";
import AssessmentItem from "./AssessmentItem";
import EmptyState from "../../../../../../Components/EmptyState/EmptyState";
import Loader from "../../../../../../Components/Loader";
import { usePage } from "@inertiajs/react";

export default function AssesssmentList({ setIsAssessmentFormOpen }) {
    const { course, program } = usePage().props;

    // Assessment store
    const assessmentByCourse = useAssessmentsStore(
        (state) => state.assessmentByCourse
    );
    const setAssessments = useAssessmentsStore((state) => state.setAssessments);

    // States related for fetching data and inifnite scrolling
    const loaderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
            }

            assessmentList = response.data.data;

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
        <div>
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
                <div
                    ref={loaderRef}
                    className=" w-full flex justify-center mt-5"
                >
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
