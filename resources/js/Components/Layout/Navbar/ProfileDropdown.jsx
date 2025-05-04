import { forwardRef } from "react";
import { Link } from "@inertiajs/react";
import { IoPersonCircle, IoLogOutSharp } from "react-icons/io5";

const ProfileDropdown = forwardRef((props, ref) => {
    console.log("Render Profile");

    return (
        <div
            ref={ref}
            className="absolute z-40 top-full right-6 sm:left-auto w-48 py-2 bg-white shadow-lg border-gray-400 border max-h-[60vh] overflow-y-auto"
        >
            <div className="font-nunito-sans w-full text-ascend-black font-bold flex flex-col space-y-2">
                <Link
                    href="/profile"
                    className="flex space-x-2 px-5 py-3 hover:bg-ascend-lightblue transition-hover duration-300"
                >
                    <IoPersonCircle className="text-size5" />
                    <span>Profile</span>
                </Link>
                <Link
                    href="/logout" // Consider adding href here
                    className="flex space-x-2 px-5 py-3 hover:bg-ascend-lightblue transition-hover duration-300"
                >
                    <IoLogOutSharp className="text-size5" />
                    <span>Sign out</span>
                </Link>
            </div>
        </div>
    );
});

export default ProfileDropdown;
