import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import PostForm from "./HomeComponents/PostForm";
import Post from "./HomeComponents/Post";
import usePostStore from "../../../../../Stores/Programs/CourseContent/postStore";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";

export default function Home() {
    // Post Store
    const postList = usePostStore((state) => state.postList);
    const clearPostDetails = usePostStore((state) => state.clearPostDetails);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const targetForm = useRef(null);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        clearPostDetails();
    };

    // Scroll into the form once opened
    useEffect(() => {
        if (isFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isFormOpen]);

    return (
        <div className="space-y-5 w-full text-ascend-black font-nunito-sans">
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <h1 className="flex-1 min-w-0 text-size7 break-words font-semibold">
                        EDUC 101 - Facilitating Learners
                    </h1>

                    <div className="dropdown dropdown-end cursor-pointer ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-4xl p-3 hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <BsThreeDotsVertical className="text-size5 text-ascend-black" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu text-size2 bg-ascend-white min-w-36 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Remove
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="break-words">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Home</h1>

                <PrimaryButton
                    isDisabled={isFormOpen}
                    doSomething={toggleForm}
                    text="Write a Post"
                />
            </div>

            {isFormOpen && (
                <div ref={targetForm}>
                    <PostForm toggleForm={toggleForm} />
                </div>
            )}
            {postList?.length > 0 ? (
                postList.map((post, index) => (
                    <Post key={index} postContent={post} />
                ))
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )}
        </div>
    );
}
