import React from "react";
import BackButton from "../Button/BackButton";
import { handleClickBackBtn } from "../../Utils/handleClickBackBtn";

export default function SinglePage({ children }) {
    return (
        <div className="relative space-y-5 font-nunito-sans text-ascend-black">
            <nav className="h-16 lg:h-20 w-full flex items-center justify-between px-5 lg:px-[100px]">
                <img src="/images/ascend_logo.png" alt="" className="w-30" />
            </nav>
            <div className="w-full flex gap-5 items-center px-5 lg:px-[100px]">
                <BackButton doSomething={handleClickBackBtn} />
            </div>
            <div className="flex justify-center px-5 lg:px-[200px]">
                {children}
            </div>
        </div>
    );
}
