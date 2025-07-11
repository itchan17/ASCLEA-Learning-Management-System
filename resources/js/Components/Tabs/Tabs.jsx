import React from "react";

export default function Tabs({ doSomething, tabList, activeTab }) {
    return (
        <div className="h-12 -mt-2 sm:-mt-5 border-b border-ascend-gray1 w-full py-1 flex sm:justify-center items-center overflow-x-auto space-x-1 font-nunito-sans text-ascend-black">
            {tabList.map((tab, index) =>
                tab ? (
                    <div
                        key={index}
                        onClick={() => doSomething(index)}
                        className={`py-1.5 px-8 cursor-pointer font-bold hover:bg-ascend-lightblue  transition-all duration-300 ${
                            activeTab === index &&
                            "bg-ascend-lightblue text-ascend-blue"
                        }`}
                    >
                        <span>{tab}</span>
                    </div>
                ) : null
            )}
        </div>
    );
}
