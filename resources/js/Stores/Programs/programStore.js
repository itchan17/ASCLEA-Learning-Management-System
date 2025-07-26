import { create } from "zustand";
import useCourseStore from "./courseStore";

const useProgramStore = create((set) => ({
    programList: [
        {
            id: 1,
            programName: "Licensure Examination for Teacher",
            programDescription:
                "The Licensure Examination for Teacher (LET) review program helps future educators prepare for the national licensure exam. It includes comprehensive coverage of General and Professional Education subjects, specialized review for majors, mock exams patterned after the actual LET, and expert coaching in test-taking strategies.",
            courseList: [
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
        },
        {
            id: 2,
            programName: "Certificate in Teaching Program",
            programDescription:
                "The Certificate in Teaching Program is designed for professionals who want to transition into teaching without an education degree. It covers the foundations of education, curriculum and lesson planning, classroom management, assessment techniques, and includes a teaching practicum under supervision.",
            courseList: [
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
                        "Covers essential data structures and algorithms in computer science.",
                    courseDay: "wednesday",
                    fromTime: "14:00",
                    toTime: "16:00",
                    courseStatus: "Active",
                },
            ],
        },
    ],
    program: {
        id: null,
        programName: "",
        programDescription: "",
        courseList: [],
    },
    activeTab: 0,

    // Set the active tab inside the program content
    setActiveTab: (tab) => {
        const { activeTab } = useProgramStore.getState();

        set({ activeTab: tab });
    },

    handleProgramChange: (field, value) =>
        set((state) => ({
            program: {
                ...state.program,
                [field]: value,
            },
        })),

    clearProgram: () =>
        set(() => ({
            program: { programName: "", programDescription: "" },
        })),

    addProgram: () => {
        const { program, programList, clearProgram } =
            useProgramStore.getState();

        const courseList = useCourseStore.getState().courseList;

        // Log current program
        console.log(program);

        // temporarily  set the id
        const newId =
            programList.length > 0
                ? programList[programList.length - 1].id + 1
                : 1;

        if (courseList.length > 0) {
            const updatedCourseList = courseList.map((course) => ({
                ...course,
                programId: newId,
            }));
            const updatedProgramDetails = {
                ...program,
                id: newId,
                courseList: updatedCourseList,
            };

            // Add to the list
            set({
                programList: [...programList, updatedProgramDetails],
            });
        } else {
            const updatedProgramDetails = { ...program, id: newId };

            // Add to the list
            set({
                programList: [...programList, updatedProgramDetails],
            });
        }

        // Clear the form
        clearProgram();
    },

    editProgramDetails: (programId) => {
        const { programList, program, clearProgram } =
            useProgramStore.getState();

        const programIndex = programList.findIndex((p) => p.id === programId);
        // create a copy of the program list
        const newProgramList = programList;

        // change array item based on the index
        newProgramList[programIndex] = program;

        set(() => ({
            // update the list by spreading the new array
            programList: [...newProgramList],
        }));

        clearProgram();
    },

    deleteProgram: (programId) => {
        const { programList, program, clearProgram } =
            useProgramStore.getState();

        const newProgramList = programList.filter((p) => p.id !== programId);

        console.log(newProgramList);

        set(() => ({
            // update the list by spreading the new array
            programList: [...newProgramList],
        }));
    },

    setProgram: (programDetails) => {
        set({
            program: programDetails,
        });
    },
}));

export default useProgramStore;
