import { forwardRef } from "react";
import { router } from "@inertiajs/react";
import { IoPersonCircle, IoLogOutSharp } from "react-icons/io5";
import { useRoute } from "ziggy-js";
import { closeDropDown } from "../../../Utils/closeDropdown";

const ProfileDropdown = forwardRef((props, ref) => {
    console.log("Render Profile");

    const route = useRoute();
    const handleProfileClick = () => {
        router.visit(route("profile"));

        props.setDropdown("");
    };

    return (
        <div
            ref={ref}
            className="absolute z-40 top-full right-6 sm:left-auto w-48 py-2 bg-white shadow-lg border-ascend-gray1 border max-h-[60vh] overflow-y-auto"
        >
            <div className="font-nunito-sans w-full text-ascend-black font-bold flex flex-col space-y-2">
                <div
                    onClick={handleProfileClick}
                    className="flex space-x-2 px-5 py-3 hover:bg-ascend-lightblue transition-hover duration-300 cursor-pointer"
                >
                    <IoPersonCircle className="text-size5" />
                    <span>Profile</span>
                </div>
                <div className="flex space-x-2 px-5 py-3 hover:bg-ascend-lightblue transition-hover duration-300 cursor-pointer">
                    <IoLogOutSharp className="text-size5" />
                    <span>Sign out</span>
                </div>
            </div>
        </div>
    );
});

export default ProfileDropdown;
