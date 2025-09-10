import React from "react";
import BackButton from "../../../../../../../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../../../../../../../Utils/handleClickBackBtn";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../../../../../Components/EmptyState/EmptyState";

export default function QuizSubmitted() {
    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans">
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>

            <div className="w-full min-w-0 flex flex-wrap justify-between items-center gap-5">
                <h1 className="text-size6 break-words font-semibold">
                    Quiz Title
                </h1>
                <div className="flex flex-wrap justify-between space-x-5">
                    <h1 className="font-bold">Submitted on:</h1>
                </div>
            </div>

            <div className="flex flex-col justify-center space-y-5">
                <EmptyState
                    imgSrc={"/images/illustrations/completed.svg"}
                    text={`“You've already completed this quiz. You can go ahead and review your responses”`}
                />
                <div className="flex justify-center w-full">
                    <PrimaryButton text={"View Results"} />
                </div>
            </div>
        </div>
    );
}
