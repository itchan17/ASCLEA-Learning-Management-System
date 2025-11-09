import { useEffect } from "react";
import TextEditor from "../../../TextEditor";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import { IoCaretDownOutline } from "react-icons/io5";
import usePostStore from "../Stores/postStore";
import usePost from "../Hooks/usePost";
import { usePage } from "@inertiajs/react";
import { closeDropDown } from "../../../../../../../Utils/closeDropdown";

export default function PostForm({ setIsPostFormOpen }) {
    const { program, course } = usePage().props;

    // Post Store
    const handlePostDetailsChange = usePostStore(
        (state) => state.handlePostDetailsChange
    );
    const postDetails = usePostStore((state) => state.postDetails);
    const clearPostDetails = usePostStore((state) => state.clearPostDetails);

    // Custom hooks
    const { handleCreatePost, isLoading, errors } = usePost({
        programId: program.program_id,
        courseId: course.course_id,
    });

    // Cclearr post details on unmount
    useEffect(() => {
        return () => clearPostDetails();
    }, []);

    const handleCLickDropDown = (status) => {
        handlePostDetailsChange("status", status);
        closeDropDown();
    };

    return (
        <div className="border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
            <div>
                <label>Post Title</label>
                <input
                    type="text"
                    value={postDetails.post_title}
                    onChange={(e) =>
                        handlePostDetailsChange("post_title", e.target.value)
                    }
                    className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                        errors && errors.material_title
                            ? "border-2 border-ascend-red"
                            : ""
                    }`}
                />
                {errors && errors.post_title && (
                    <span className="text-ascend-red">{errors.post_title}</span>
                )}
            </div>
            <div>
                <label htmlFor="">Description</label>
                <TextEditor
                    fieldName={"post_description"}
                    value={postDetails.post_description}
                    setValue={handlePostDetailsChange}
                />
            </div>
            <div className=" flex flex-wrap justify-end gap-2">
                <SecondaryButton
                    doSomething={() => setIsPostFormOpen(false)}
                    text={"Cancel"}
                />
                <div className="flex space-x-[0.5px]">
                    <PrimaryButton
                        doSomething={() => handleCreatePost(setIsPostFormOpen)}
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        text={
                            postDetails.status === "published"
                                ? "Publish"
                                : "Save as draft"
                        }
                    />

                    {/* Dropdown button */}
                    {/* Always publish if material is for a section */}

                    <div className="dropdown dropdown-end cursor-pointer ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="px-3 h-10 bg-ascend-blue hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                        >
                            <div className="text-size1 ">
                                {<IoCaretDownOutline />}
                            </div>
                        </button>

                        <ul
                            tabIndex={0}
                            className="text-size2 dropdown-content menu space-y-2 font-medium bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li
                                onClick={() => handleCLickDropDown("published")}
                            >
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Publish
                                </a>
                            </li>
                            <li onClick={() => handleCLickDropDown("draft")}>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Save as drat
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
