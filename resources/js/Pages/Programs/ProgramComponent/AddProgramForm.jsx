import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import AddCourse from "./AddCourse";

export default function AddProgramForm({ toggleModal }) {
    const [addCourse, setAddCourse] = useState(false);

    const toggleAddCourse = () => {
        setAddCourse(!addCourse);
    };

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                action=""
                className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">Add Program</h1>
                <div>
                    <label htmlFor="">
                        Program Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="">Program Description</label>
                    <textarea
                        name=""
                        id=""
                        className="border w-full p-2 focus:outline-ascend-blue"
                        rows={5}
                    ></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-size4 font-bold">Courses</h1>
                    {addCourse && (
                        <span
                            className="cursor-pointer text-ascend-red"
                            onClick={toggleAddCourse}
                        >
                            Cancel
                        </span>
                    )}
                </div>
                {addCourse && <AddCourse toggleAddCourse={toggleAddCourse} />}
                {!addCourse && (
                    <PrimaryButton
                        text={"Add Course"}
                        doSomething={toggleAddCourse}
                    />
                )}

                <div className="flex justify-end space-x-2">
                    <SecondaryButton doSomething={toggleModal} text={"Close"} />
                    <PrimaryButton text={"Submit"} />
                </div>
            </form>
        </div>
    );
}
