import { create } from "zustand";

const useUserStore = create((set) => ({
    courseList: [
        {
            id: 1,
            courseCode: "Educ 101",
            courseName: "Facilitating Learners",
            courseStatus: "Ongoing",
        },
    ],
    addedCourseList: [],

    handleAddCourseChange: (newCourse) => {
        const { addedCourseList } = useUserStore.getState();

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
        const { addedCourseList } = useUserStore.getState();

        set({
            addedCourseList: [],
        });
    },

    handleAddCourse: () => {
        const { addedCourseList, courseList, clearAddedCourseList } =
            useUserStore.getState();
        set({
            courseList: [...courseList, ...addedCourseList],
        });

        clearAddedCourseList();
    },
}));

export default useUserStore;
