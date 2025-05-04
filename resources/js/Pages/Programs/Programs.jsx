import React from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { MdNotifications } from "react-icons/md";

export default function Programs() {
    console.log("Render Programs");

    const doSomething = () => {
        console.log("CLick Button");
    };

    return (
        <div className="flex flex-wrap space-y-40">
            <PrimaryButton
                doSomething={doSomething}
                icon={<MdNotifications />}
                text={"Button"}
            />
            Programs
            {/* <div className="break-all">
                asdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfsdfdsafdsfds
            </div> */}
            <div className="border w-64 h-20"></div>
            <div className="border w-64 h-20"></div>
            <div className="border w-64 h-20"></div>
            <div className="border w-64 h-20"></div>
        </div>
    );
}
