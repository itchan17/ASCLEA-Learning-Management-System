import React from "react";
import { IoSearch } from "react-icons/io5";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import usePeopleStore from "../../../../Stores/Programs/peopleStore";

export default function AddStudentForm({ toggleModal }) {
    // People Store
    const handleAddPeopleChange = usePeopleStore(
        (state) => state.handleAddPeopleChange
    );
    const clearNewPeople = usePeopleStore((state) => state.clearNewPeople);
    const handleAddPeople = usePeopleStore((state) => state.handleAddPeople);

    const users = [
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
    ];

    const handleAdd = (e) => {
        e.preventDefault();
        handleAddPeople();
        toggleModal();
    };

    const handleCancel = () => {
        clearNewPeople();
        toggleModal();
    };
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center text-ascend-black">
            <form
                onSubmit={(e) => handleAdd(e)}
                className="bg-ascend-white opacity-100 p-5 w-120 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">Add Student</h1>

                <div className="relative">
                    <input
                        className="border h-9 w-full pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search by typing name or email"
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
                <div className="max-h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                    {users &&
                        users.map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-full flex items-center py-5"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-ascend-blue w-4 h-4"
                                        onChange={() =>
                                            handleAddPeopleChange(user)
                                        }
                                    />
                                    <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl ml-5 mr-3"></div>
                                    <div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                {user.name}
                                            </span>

                                            <span className="text-size1 -mt-1">
                                                {user.role}
                                            </span>
                                        </div>
                                        <span className="text-size1">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={handleCancel}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        doSomething={(e) => handleAdd(e)}
                        btnType={"submit"}
                        text={"Add"}
                    />
                </div>
            </form>
        </div>
    );
}
