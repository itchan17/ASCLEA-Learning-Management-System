import { forwardRef } from "react";
import { MdOutlineAssignment, MdOutlineNotifications } from "react-icons/md";

const NotifDropdown = forwardRef((props, ref) => {
    console.log("Render Notif");
    return (
        <div
            ref={ref}
            className="absolute z-40 top-full right-6 left-6 sm:left-auto sm:w-[450px] pt-2 pb-5 bg-white shadow-lg border-ascend-gray1 border max-h-[60vh] overflow-y-auto scrollbar-default hover:scrollbar-hover "
        >
            <div className="font-nunito-sans w-full text-ascend-black flex flex-col space-y-2 h-full">
                <div className="px-5 pt-3 pb-2 space-y-2">
                    <h1 className="font-bold text-size4">Notifications</h1>
                    <div className="text-right space-x-5">
                        <span className="cursor-pointer hover:font-semibold hover:text-ascend-blue transition-all duration-300">
                            Mark all as read
                        </span>
                        <span className="cursor-pointer hover:font-semibold hover:text-ascend-blue transition-all duration-300">
                            Clear all
                        </span>
                    </div>
                </div>
                <div className="h-full">
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightyellow rounded-[50px]">
                            <MdOutlineAssignment className="text-size6 text-ascend-yellow" />
                        </div>

                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                You have been assigned to the course
                                <span className="font-bold"> Educ 101 </span>by
                                <span className="font-bold"> John Doe</span>.
                            </p>
                            <span className="text-size1">Yesterday</span>
                        </div>
                    </div>
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightblue rounded-[50px]">
                            <MdOutlineNotifications className="text-size6 text-ascend-blue" />
                        </div>
                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                New announcement in
                                <span className="font-bold"> Educ 101</span>:
                                <span className="font-bold">
                                    "Midterm next week".
                                </span>
                            </p>
                            <span className="text-size1">16 hours ago</span>
                        </div>
                    </div>
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightyellow rounded-[50px]">
                            <MdOutlineAssignment className="text-size6 text-ascend-yellow" />
                        </div>

                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                You have been assigned to the course
                                <span className="font-bold"> Educ 101 </span>by
                                <span className="font-bold"> John Doe</span>.
                            </p>
                            <span className="text-size1">Yesterday</span>
                        </div>
                    </div>
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightblue rounded-[50px]">
                            <MdOutlineNotifications className="text-size6 text-ascend-blue" />
                        </div>
                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                New announcement in
                                <span className="font-bold"> Educ 101</span>:
                                <span className="font-bold">
                                    "Midterm next week".
                                </span>
                            </p>
                            <span className="text-size1">16 hours ago</span>
                        </div>
                    </div>
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightyellow rounded-[50px]">
                            <MdOutlineAssignment className="text-size6 text-ascend-yellow" />
                        </div>

                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                You have been assigned to the course
                                <span className="font-bold"> Educ 101 </span>by
                                <span className="font-bold"> John Doe</span>.
                            </p>
                            <span className="text-size1">Yesterday</span>
                        </div>
                    </div>
                    <div className="sm:h-24 hover:bg-ascend-lightblue transition-all duration-300 pl-5 pr-3 flex items-start cursor-pointer space-x-5">
                        <div className="p-4 mt-2 bg-ascend-lightblue rounded-[50px]">
                            <MdOutlineNotifications className="text-size6 text-ascend-blue" />
                        </div>
                        <div className="h-full py-2 flex flex-col justify-between">
                            <p className="">
                                New announcement in
                                <span className="font-bold"> Educ 101</span>:
                                <span className="font-bold">
                                    "Midterm next week".
                                </span>
                            </p>
                            <span className="text-size1">16 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default NotifDropdown;
