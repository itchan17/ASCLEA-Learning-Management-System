import { create } from "zustand";
import useProgramStore from "./programStore";

const useCourseStore = create((set) => ({
    activeTab: 0,

    course: {
        course_code: "",
        course_name: "",
        course_description: "",
        course_day: "",
        start_time: "",
        end_time: "",
    },

    // Set the active tab inside the course content
    setActiveTab: (tab) => {
        const { activeTab } = useCourseStore.getState();

        set({ activeTab: tab });
    },

    handleCourseChange: (field, value) => {
        const { course } = useCourseStore.getState();

        set({
            course: {
                ...course,
                [field]: value,
            },
        });
    },

    setCourseDetails: (details) => {
        set({ course: details });
    },

    clearCourse: () =>
        set(() => ({
            course: {
                course_code: "",
                course_name: "",
                course_description: "",
                course_day: "",
                start_time: "",
                end_time: "",
            },
        })),

    archiveCourse: (programId, courseId) => {
        if ((programId, courseId)) {
            useProgramStore.setState((state) => ({
                programList: state.programList.map((program) => {
                    if (program.id === programId) {
                        // filter the selected course
                        const updatedCourseList = program.courseList.filter(
                            (course) => course.id !== courseId
                        );

                        // return the program with updated course
                        return {
                            ...program,
                            courseList: updatedCourseList,
                        };
                    } else {
                        return program;
                    }
                }),
            }));
        }
    },

    removeCourse: (courseIndex) => {
        const { courseList } = useCourseStore.getState();

        set({
            courseList: courseList.filter(
                (course, index) => index !== courseIndex
            ),
        });
    },
}));

export default useCourseStore;
