import { create } from "zustand";

const StudentStore = create((set) => ({
    studentList: [
        {
            id: 1,
            name: "John Doe",
            time: "2.5 hrs",
            email:"johndoe@gmail.com",
            score: "110/150",
        },
        {
            id: 2,
            name: "Jane Smith",
            time: "3.0 hrs",
            email:"janesmith@gmail.com",
            score: "120/150",
        },
        {
            id: 3,
            name: "Alice Johnson",
            time: "1.5 hrs",
            email:"alicesmith@gmail.com",
            score: "95/150",
        },
        {
            id: 4,
            name: "Bob Brown",
            time: "2.0 hrs",
            email:"bobbrown@gmail.com",
            score: "105/150",
        },
    ],
    activeTab: "Students",
    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },
    removeStudent: (studentIndex) => {
        const { studentList } = StudentStore.getState();
        set({
            studentList: studentList.filter((_, index) => index !== studentIndex),
        });
    },
    setStudentList: (newStudentList) => {
        set({ studentList: newStudentList });
    },
    setStudent: (studentIndex, newStudent) => {
        const { studentList } = StudentStore.getState();
        const updatedStudentList = [...studentList];
        updatedStudentList[studentIndex] = newStudent;
        set({ studentList: updatedStudentList });
    },
    addStudent: (newStudent) => {
        set((state) => ({
            studentList: [...state.studentList, newStudent],
        }));
    },
}));

export default StudentStore;
         