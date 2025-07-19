import { create } from "zustand";

const useArchives = create((set) => ({
    archivedCourseList: [
        {
            id: 1,
            programId: 1,
            courseCode: "WD101",
            courseName: "Web Development 101",
            courseDescription:
                "Introduction to HTML, CSS, and JavaScript for beginners.",
            courseDay: "monday",
            fromTime: "09:00",
            toTime: "11:00",
            courseStatus: "Active",
        },
        {
            id: 2,
            programId: 2,
            courseCode: "DSA202",
            courseName: "Data Structures and Algorithms",
            courseDescription:
                "Covers essential data structures and algorithms in computer science. ures and algorithms in computer science. ures and algorithms in computer science.",
            courseDay: "wednesday",
            fromTime: "14:00",
            toTime: "16:00",
            courseStatus: "Active",
        },
    ],

    archivedStudentList: [
        {
            firstName: "John",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
        {
            firstName: "Mark",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
    ],

    archivedStaffList: [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
        {
            id: 3,
            firstName: "Mark",
            lastName: "Doe",
            middleName: "Aaron",
            archivedBy: "Jenny Doe",
            archivedDate: "6/1/2025",
            daysRemaining: 20,
        },
    ],
}));

export default useArchives;
