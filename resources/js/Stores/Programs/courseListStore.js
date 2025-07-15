import { create } from "zustand";

// This is a temporrary store for listing the assigned courses to the student or faculty

const useCourseList = create((set) => ({
    courseList: [],
    addedCourseList: [],

    handleAddCourseChange: (newCourse) => {
        const { addedCourseList } = useCourseList.getState();

        const updatedAddedCourses = addedCourseList.some(
            (p) => p.id === newCourse.id
        )
            ? addedCourseList.filter((p) => p.id !== newCourse.id)
            : [...addedCourseList, newCourse];

        console.log(updatedAddedCourses);
        set({
            addedCourseList: updatedAddedCourses,
        });
    },

    clearAddedCourseList: () => {
        const { addedCourseList } = useCourseList.getState();

        set({
            addedCourseList: [],
        });
    },

    handleAddCourse: () => {
        const { addedCourseList, courseList, clearAddedCourseList } =
            useCourseList.getState();
        set({
            courseList: [...courseList, ...addedCourseList],
        });

        clearAddedCourseList();
    },
}));

export default useCourseList;
