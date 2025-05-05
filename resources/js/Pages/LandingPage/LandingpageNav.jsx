import { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";

export default function LandingpageNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav
            className="fixed z-50 top-0 h-16 lg:h-20 w-full backdrop-blur-md flex items-center justify-between pr-5 xl:pr-[100px] bg-ascend-black/40
                "
        >
            <div
                className="bg-ascend-white border border-white h-full w-60 xl:w-86 pl-5 xl:pl-[100px] flex items-center"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                }}
            >
                <img
                    src="/images/ascend_logo.png"
                    alt=""
                    className="w-32 lg:w-40"
                />
            </div>
            <menu className="flex items-center space-x-8 xl:space-x-12">
                <ul className="hidden lg:flex space-x-8 xl:space-x-12 font-nunito-sans text-ascend-white font-bold">
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">About Us</a>
                    </li>
                    <li>
                        <a href="">Programs</a>
                    </li>
                    <li>
                        <a href="">Admissions</a>
                    </li>
                    <li>
                        <a href="">Contact</a>
                    </li>
                </ul>
                <div className="space-x-2 hidden md:flex">
                    <PrimaryButton
                        textColor={"text-ascend-black"}
                        btnColor={"bg-ascend-white"}
                        text={"Login"}
                    />
                    <PrimaryButton text={"Enroll"} />
                </div>
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer rounded-[50px] transition-all duration-300 lg:hidden"
                >
                    <div className="relative w-8 h-6 space-y-1 flex flex-col justify-between ">
                        <span
                            className={`${
                                isOpen
                                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                                    : "block"
                            } w-full h-[4px] bg-ascend-white rounded transition-all duration-300`}
                        ></span>
                        {!isOpen && (
                            <span className="w-full h-[4px] bg-ascend-white rounded "></span>
                        )}
                        <span
                            className={`${
                                isOpen
                                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
                                    : "block"
                            } w-full h-[4px] bg-ascend-white rounded transition-all duration-300`}
                        ></span>
                    </div>
                </button>
            </menu>

            {/* Dropdown menu */}
            <menu
                className={`flex flex-col items-start lg:hidden absolute top-full py-4 px-10 w-full bg-primary-color shadow-xl transition-all duration-300 ease-out transform ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                } backdrop-blur-3xl bg-ascend-black/80 space-y-4`}
            >
                <ul className="flex flex-col w-full font-nunito-sans text-ascend-white font-bold">
                    <li className="py-4">
                        <a href="">Home</a>
                    </li>
                    <li className="py-4">
                        <a href="">About Us</a>
                    </li>
                    <li className="py-4">
                        <a href="">Programs</a>
                    </li>
                    <li className="py-4">
                        <a href="">Admissions</a>
                    </li>
                    <li className="py-4">
                        <a href="">Contact</a>
                    </li>
                </ul>
                <div className="space-x-2 flex md:hidden ">
                    <PrimaryButton
                        textColor={"text-ascend-black"}
                        btnColor={"bg-ascend-white"}
                        text={"Login"}
                    />
                    <PrimaryButton text={"Enroll"} />
                </div>
            </menu>
        </nav>
    );
}
