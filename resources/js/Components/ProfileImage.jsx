import React from "react";

export default function ProfileImage({ userData, profileImageSize, textSize }) {
    return (
        <>
            {userData.profile_image ? (
                <img
                    src={`/storage/${userData.profile_image}`}
                    alt="Profile image"
                    className={`${
                        profileImageSize ? profileImageSize : "w-12 h-12"
                    } bg-ascend-gray1/20 rounded-full shrink-0`}
                ></img>
            ) : (
                <div
                    className={`${
                        profileImageSize ? profileImageSize : "w-12 h-12"
                    } bg-ascend-blue rounded-full shrink-0 flex items-center justify-center`}
                >
                    <span
                        className={`${
                            textSize ? textSize : "text-size5"
                        } font-bold  text-ascend-white capitalize`}
                    >
                        {userData.first_name[0]}
                    </span>
                </div>
            )}
        </>
    );
}
