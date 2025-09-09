import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function QuizAnswerFormNav() {
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolledDown(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav
            className={`sticky top-0 z-999 bg-ascend-white transition-all duration-300 font-nunito-sans ${
                isScrolledDown ? "shadow-[0px_0px_15px_5px_#a1a1a1]" : ""
            }`}
        >
            <div className="relative sm:h-16 w-full flex gap-5 items-center justify-between px-5 lg:px-[100px]">
                <div className="flex h-10 sm:h-fit items-center justify-center sm:justify-between gap-5 w-full">
                    <img
                        src="/images/ascend_logo.png"
                        alt=""
                        className="w-30 hidden sm:block"
                    />
                    <div className="flex space-x-5">
                        <h1 className="flex font-bold">
                            Camera Status:{" "}
                            <span className="flex items-center ml-2 text-ascend-green">
                                <AiFillCheckCircle className="mr-1" />
                                Active
                            </span>
                        </h1>
                        <h1 className="font-bold">1:30:26</h1>
                    </div>
                </div>
            </div>
        </nav>
    );
}
