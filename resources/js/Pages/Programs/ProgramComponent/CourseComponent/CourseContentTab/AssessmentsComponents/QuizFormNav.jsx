import { useState } from "react";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";
import { MdSettings } from "react-icons/md";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";

export default function QuizFormNav({ isLoading, savedLabel }) {
    // Create Quiz Store
    const quizDetails = useCreateQuizStore((state) => state.quizDetails);
    const handleQuizDetailsChange = useCreateQuizStore(
        (state) => state.handleQuizDetailsChange
    );
    const isChanged = useCreateQuizStore((state) => state.isChanged);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="relative sm:h-16 w-full flex gap-5 items-center justify-between px-5 lg:px-[100px]">
            <div className="flex items-end gap-5">
                <img src="/images/ascend_logo.png" alt="" className="w-30" />
                {isChanged && (
                    <span className="text-size3 mb-1">
                        {isLoading ? "Saving..." : savedLabel}
                    </span>
                )}
            </div>

            <menu className="hidden sm:flex items-center justify-end gap-5 w-full sm:w-fit">
                <PrimaryButton text={"Save Quiz"} />

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color transition-all duration-300"
                    >
                        <MdSettings className="text-size6 " />
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu mt-1 bg-ascend-white w-80 py-3 px-5 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black space-y-5"
                    >
                        <h1 className="text-size4 font-bold">Settings</h1>
                        <div className="flex space-x-3">
                            <input
                                type="checkbox"
                                checked={quizDetails.show_answers_after}
                                onChange={(e) =>
                                    handleQuizDetailsChange(
                                        "show_answers_after",
                                        quizDetails.show_answers_after
                                            ? false
                                            : true
                                    )
                                }
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-size2 text-nowrap text-ascend-black font-bold">
                                Show answers after
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex space-x-3">
                                <input
                                    type="checkbox"
                                    checked={quizDetails.cheating_mitigation}
                                    onChange={(e) =>
                                        handleQuizDetailsChange(
                                            "cheating_mitigation",
                                            quizDetails.cheating_mitigation
                                                ? false
                                                : true
                                        )
                                    }
                                    className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                                />
                                <span className="text-size2 text-ascend-black font-bold text-nowrap">
                                    Cheating mitigation
                                </span>
                            </div>
                            {quizDetails.cheating_mitigation ? (
                                <div className="text-size2">
                                    <h1 className="my-3 font-bold">Options</h1>
                                    <div className="">
                                        <h1 className="font-bold">
                                            Allowed objects
                                        </h1>
                                        <div className="flex space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "book"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "book"
                                                        )
                                                    }
                                                />
                                                <span>Book</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "laptop"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "laptop"
                                                        )
                                                    }
                                                />
                                                <span>Laptop</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option ===
                                                            "cellphone"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "cellphone"
                                                        )
                                                    }
                                                    className="accent-ascend-blue"
                                                />
                                                <span>Cellphone</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="font-bold">
                                            Allowed face direction
                                        </h1>
                                        <div className="flex space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "up"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "up"
                                                        )
                                                    }
                                                />
                                                <span>Up</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "down"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "down"
                                                        )
                                                    }
                                                />
                                                <span>Down</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "left"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "left"
                                                        )
                                                    }
                                                />
                                                <span>Left</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="accent-ascend-blue"
                                                    checked={quizDetails.cv_options.some(
                                                        (option) =>
                                                            option === "right"
                                                    )}
                                                    onChange={() =>
                                                        handleQuizDetailsChange(
                                                            "cv_options",
                                                            "right"
                                                        )
                                                    }
                                                />
                                                <span>Right</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </ul>
                </div>
            </menu>

            {/* Dropdown menu button */}
            <button
                onClick={toggleMenu}
                className="cursor-pointer rounded-[50px] transition-all duration-300 sm:hidden"
            >
                <div className="relative w-8 h-6 space-y-1 flex flex-col justify-between ">
                    <span
                        className={`${
                            isOpen
                                ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                                : "block"
                        } w-full h-[4px] bg-ascend-black rounded transition-all duration-300`}
                    ></span>
                    {!isOpen && (
                        <span className="w-full h-[4px] bg-ascend-black rounded "></span>
                    )}
                    <span
                        className={`${
                            isOpen
                                ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
                                : "block"
                        } w-full h-[4px] bg-ascend-black rounded transition-all duration-300`}
                    ></span>
                </div>
            </button>

            {/* Dropdown menu */}
            <menu
                className={`sm:hidden w-full left-0 absolute z-10 top-full bg-ascend-white shadow-shadow1 transition-all duration-300 ease-in-out transform ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-5 pointer-events-none"
                }`}
            >
                <ul className="py-4 px-5 space-y-5">
                    <h1 className="text-size4 font-bold">Settings</h1>
                    <li className="flex space-x-3">
                        <input
                            type="checkbox"
                            checked={quizDetails.show_answers_after}
                            onChange={(e) =>
                                handleQuizDetailsChange(
                                    "show_answers_after",
                                    quizDetails.show_answers_after
                                        ? false
                                        : true
                                )
                            }
                            className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                        />
                        <span className="text-size2 text-nowrap text-ascend-black font-bold">
                            Show answers after
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex space-x-3">
                            <input
                                type="checkbox"
                                checked={quizDetails.cheating_mitigation}
                                onChange={(e) =>
                                    handleQuizDetailsChange(
                                        "cheating_mitigation",
                                        quizDetails.cheating_mitigation
                                            ? false
                                            : true
                                    )
                                }
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-size2 text-ascend-black font-bold text-nowrap">
                                Cheating mitigation
                            </span>
                        </div>
                        {quizDetails.cheating_mitigation ? (
                            <div className="text-size2">
                                <h1 className="my-3 font-bold">Options</h1>
                                <div className="">
                                    <h1 className="font-bold">
                                        Allowed objects
                                    </h1>
                                    <div className="flex space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "book"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "book"
                                                    )
                                                }
                                            />
                                            <span>Book</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "laptop"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "laptop"
                                                    )
                                                }
                                            />
                                            <span>Laptop</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "cellphone"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "cellphone"
                                                    )
                                                }
                                            />
                                            <span>Cellphone</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h1 className="font-bold">
                                        Allowed face direction
                                    </h1>
                                    <div className="flex space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) => option === "up"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "up"
                                                    )
                                                }
                                            />
                                            <span>Up</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "down"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "down"
                                                    )
                                                }
                                            />
                                            <span>Down</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "left"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "left"
                                                    )
                                                }
                                            />
                                            <span>Left</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="checkbox"
                                                className="accent-ascend-blue"
                                                checked={quizDetails.cv_options.some(
                                                    (option) =>
                                                        option === "right"
                                                )}
                                                onChange={() =>
                                                    handleQuizDetailsChange(
                                                        "cv_options",
                                                        "right"
                                                    )
                                                }
                                            />
                                            <span>Right</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </li>
                    <div className="grid">
                        <PrimaryButton text={"Save Quiz"} />
                    </div>
                </ul>
            </menu>
        </nav>
    );
}
