import React from "react";
import TextEditor from "../../TextEditor";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import usePostStore from "../../../../../../Stores/Programs/CourseContent/postStore";

export default function PostForm({ toggleForm }) {
    // Post Store
    const postValue = usePostStore((state) => state.postValue);
    const handlePostValueChange = usePostStore(
        (state) => state.handlePostValueChange
    );
    const handleAddPost = usePostStore((state) => state.handleAddPost);
    const handlePostTitleChange = usePostStore(
        (state) => state.handlePostTitleChange
    );
    const postDetails = usePostStore((state) => state.postDetails);

    const handleWritePost = () => {
        handleAddPost();
        toggleForm();
    };
    return (
        <div className="border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={postDetails.postTitle}
                    onChange={(e) =>
                        handlePostTitleChange("postTitle", e.target.value)
                    }
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <TextEditor
                    value={postValue}
                    setValue={handlePostValueChange}
                />
            </div>
            <div className=" flex flex-wrap justify-end gap-2">
                <SecondaryButton doSomething={toggleForm} text={"Cancel"} />
                <PrimaryButton doSomething={handleWritePost} text={"Post"} />
            </div>
        </div>
    );
}
