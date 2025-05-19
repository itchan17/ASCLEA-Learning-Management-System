import { create } from "zustand";

const usePeopleStore = create((set) => ({
    peopleList: [
        {
            id: 1,
            name: "John Doe",
            role: "Student",
            email: "johndoe@email.com",
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Student",
            email: "janesmith@email.com",
        },
        {
            id: 3,
            name: "Mark Lee",
            role: "Student",
            email: "marklee@email.com",
        },
    ],
    newPeople: [],

    handleAddPeopleChange: (newPerson) => {
        const { newPeople } = usePeopleStore.getState();

        const updatedPeople = newPeople.some((p) => p.id === newPerson.id)
            ? newPeople.filter((p) => p.id !== newPerson.id)
            : [...newPeople, newPerson];

        console.log(updatedPeople);
        set({
            newPeople: updatedPeople,
        });
    },

    clearNewPeople: () => {
        const { newPeople } = usePeopleStore.getState();

        set({
            newPeople: [],
        });
    },

    handleAddPeople: () => {
        const { newPeople, peopleList, clearNewPeople } =
            usePeopleStore.getState();
        set({
            peopleList: [...peopleList, ...newPeople],
        });

        clearNewPeople();
    },
}));

export default usePeopleStore;
