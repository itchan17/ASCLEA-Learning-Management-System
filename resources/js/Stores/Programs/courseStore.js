import { create } from "zustand";

const useCourseStore = create((set) => ({
    activeTab: 0,
    courseList: [],
    course: {
        courseCode: "",
        courseName: "",
        courseDescription: "",
        courseDay: "",
        fromTime: "",
        toTime: "",
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

    clearCourse: () =>
        set(() => ({
            course: {
                courseCode: "",
                courseName: "",
                courseDescription: "",
                courseDay: "",
                fromTime: "",
                toTime: "",
            },
        })),

    addCourse: () => {
        const { course, courseList, clearCourse } = useCourseStore.getState();

        set({ courseList: [...courseList, course] });

        clearCourse();
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
