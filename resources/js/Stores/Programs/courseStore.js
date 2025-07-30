import { create } from "zustand";
import useProgramStore from "./programStore";

const useCourseStore = create((set) => ({
    activeTab: 0,
    // courseList: [],
    course: {
        course_code: "",
        course_name: "",
        course_description: "",
        course_day: "",
        start_time: "",
        end_time: "",
    },

    // clearCourseList: () => {
    //     set(() => ({
    //         courseList: [],
    //     }));
    // },

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

    // setCourseList: (validatedCourse) => {
    //     console.log(validatedCourse);
    //     const { clearCourse } = useCourseStore.getState();
    //     const { courseList } = useCourseStore.getState();
    //     set({ courseList: [...courseList, validatedCourse] });
    //     clearCourse();
    // },

    // addCourse: (programId) => {
    //     const { course, courseList, clearCourse } = useCourseStore.getState();

    //     // temporarily  set the id
    //     const newId =
    //         courseList.length > 0
    //             ? courseList[courseList.length - 1].id + 1
    //             : 1;

    //     if (programId) {
    //         useProgramStore.setState((state) => ({
    //             programList: state.programList.map((program) => {
    //                 if (program.id === programId) {
    //                     // get the last array of program's courselist and add 1 to termporary set an id
    //                     const courseId =
    //                         program.courseList.length > 0
    //                             ? program.courseList[
    //                                   program.courseList.length - 1
    //                               ].id + 1
    //                             : 1;

    //                     const updatedCourseDetails = {
    //                         ...course,
    //                         id: courseId,
    //                         programId,
    //                     };

    //                     // return the new course to the program course list
    //                     return {
    //                         ...program,
    //                         courseList: [
    //                             ...program.courseList,
    //                             updatedCourseDetails,
    //                         ],
    //                     };
    //                 } else {
    //                     return program;
    //                 }
    //             }),
    //         }));
    //     } else {
    //         const updatedCourseDetails = { ...course, id: newId };

    //         set({ courseList: [...courseList, updatedCourseDetails] });
    //     }

    //     clearCourse();
    // },

    handleEditCourse: (programId, courseId) => {
        const { course, clearCourse } = useCourseStore.getState();
        if ((programId, courseId)) {
            useProgramStore.setState((state) => ({
                programList: state.programList.map((program) => {
                    if (program.id === programId) {
                        // find the index of the course to edit
                        const courseIndex = program.courseList.findIndex(
                            (course) => course.id === courseId
                        );

                        // make a copy of the array
                        const updatedCourseList = program.courseList;

                        // change course details with the new course
                        updatedCourseList[courseIndex] = course;

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

        clearCourse();
    },

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

    setCourseDetails: (details) => {
        set({ course: details });
    },
}));

export default useCourseStore;
