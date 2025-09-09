import React from "react";
import QuizAnswerFormNav from "./QuizAnswerFormNav";
import QuestionItem from "./QuestionItem";

export default function QuizAnswerForm() {
    return (
        <div className="font-nunito-sans">
            <QuizAnswerFormNav />

            <main className="flex justify-center px-5 pb-5 lg:px-[150px]">
                <div className="w-full max-w-235 space-y-5">
                    <div className="w-full space-y-5 border border-ascend-gray1 shadow-shadow1 p-5">
                        <h1 className="font-bold text-size6">QUiz Title</h1>
                    </div>

                    {/* Questions here */}
                    <QuestionItem questionId={1} />
                    <QuestionItem questionId={2} />
                    <QuestionItem questionId={3} />
                    <QuestionItem questionId={4} />
                    <QuestionItem questionId={5} />
                    <QuestionItem questionId={6} />
                    <QuestionItem questionId={7} />
                    <QuestionItem questionId={8} />
                    <QuestionItem questionId={9} />
                    <QuestionItem questionId={10} />
                    <QuestionItem questionId={11} />
                    <QuestionItem questionId={12} />
                    <QuestionItem questionId={13} />
                    <QuestionItem questionId={14} />
                </div>
            </main>
        </div>
    );
}

QuizAnswerForm.layout = null;
