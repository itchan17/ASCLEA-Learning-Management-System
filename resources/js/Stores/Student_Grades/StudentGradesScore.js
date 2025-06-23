import { create } from "zustand";

const useStudentGradesScoreStore = create((set) => ({
    studentGradesScore: [
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            middle_name: "Aaron",
            program: "Licensure Examination for Teachers (LET)",
            year: "2024-2025",
            courses : [
                {course_code: "Com 101", course_name: "Lorem ipsum dolor sit amet", grade: 1.5},
                {course_code: "Com 102", course_name: "Lorem ipsum dolor sit amet", grade: 1.0},
                {course_code: "Com 103", course_name: "Lorem ipsum dolor sit amet", grade: 1.0},
                {course_code: "Com 104", course_name: "Lorem ipsum dolor sit amet", grade: 1.25},
                {course_code: "Math 101", course_name: "Lorem ipsum dolor sit amet", grade: 1.75},
                {course_code: "Math 102", course_name: "Lorem ipsum dolor sit amet", grade: 2.0},
                {course_code: "Math 103", course_name: "Lorem ipsum dolor sit amet", grade: 2.5},
                {course_code: "Math 104", course_name: "Lorem ipsum dolor sit amet", grade: 5.0},
                {course_code: "Science 101", course_name: "Lorem ipsum dolor sit amet", grade: 1.5},
                {course_code: "Science 102", course_name: "Lorem ipsum dolor sit amet", grade: 2.0}
                        ]
        }
    ] 
}));

export default useStudentGradesScoreStore;