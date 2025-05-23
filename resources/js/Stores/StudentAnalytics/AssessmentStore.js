import { create } from "zustand";

const AssessmentStore = create((set) => ({

    assessmentList: [
        {
            assessmentID: 1,
            assessmentTitle: "Assessment 1",
            assessmentCourse: "Course 1",
            assessmentType: "Assignment",
            assessmentDueDate: "2023-10-01",
        },
        {
            assessmentID: 2,
            assessmentTitle: "Assessment 2",
            assessmentCourse: "Course 2",
            assessmentType: "Quiz",
            assessmentDueDate: "2023-10-15",
        },
    ],

    activeTab: "Assessments",

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    removeAssessment: (assessmentIndex) => {
        const { assessmentList } = AssessmentStore.getState();

        set({
            assessmentList: assessmentList.filter((_, index) => index !== assessmentIndex),
        });
    },
}));

export default AssessmentStore;
