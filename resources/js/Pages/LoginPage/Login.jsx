import React, { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function Login() {
    const route = useRoute();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        router.visit(route("dashboard.index"));
    };

    function PrimaryButton({
        doSomething,
        icon,
        text,
        textColor,
        btnColor,
        className,
    }) {
        return (
            <button
                onClick={doSomething}
                className={`${
                    btnColor || "bg-ascend-blue"
                } hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300 ${
                    className || ""
                } px-5 h-10 space-x-1`}
            >
                {icon && <div className="text-xl">{icon}</div>}
                <span
                    className={`font-nunitosans font-semibold ${
                        textColor || ""
                    }`}
                >
                    {text}
                </span>
            </button>
        );
    }

    const [screenSize, setScreenSize] = useState(() =>
        typeof window !== "undefined" && window.innerWidth >= 768
            ? "medium"
            : "small"
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleResize = () => {
            setScreenSize(mediaQuery.matches ? "medium" : "small");
        };

        handleResize();
        mediaQuery.addEventListener("change", handleResize);
        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    const clipPathSmall = "polygon(100% 50px, 0% 0%, 0% 100%, 100% 100%)"; // for small screen
    const clipPathMedium = "polygon(10px 0px, 100% 0px, 100% 100%, 10% 100%)"; // for big or medium screen

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row">
            {/* LEFT SIDE - Login Form */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
                <img
                    src="/images/ascend_logo.png"
                    alt="Ascend Logo"
                    className="w-60 mb-6"
                />
                <h1 className="text-2xl font-nunito-sans font-bold mb-2 ">
                    Welcome!
                </h1>
                <p className="text-xl-1 font-nunito-sans  text mb-4">
                    Sign to your account to continue
                </p>

                <div className="w-full max-w-sm">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            id="emailfloat"
                            class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="emailfloat"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="passwordfloat"
                            class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer password-input"
                            placeholder=" "
                        />
                        <label
                            htmlFor="passwordfloat"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Password
                        </label>
                    </div>

                    <div className="flex justify-between items-center text-sm mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 mr-2 text-blue-300 accent-ascend-blue font-nunito-sans"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />{" "}
                            Show password
                        </label>
                        <a
                            href="/emailverification"
                            className="text-ascend-blue hover:underline font-nunito-sans"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <PrimaryButton
                        doSomething={handleLogin}
                        text="Login"
                        className={"w-full"}
                    />
                </div>
            </div>

            {/* RIGHT SIDE - Enroll section */}
            <div className="w-full h-100 md:h-screen md:w-1/2">
                <div
                    className="h-full bg-ascend-yellow pt-5 md:pt-0"
                    style={{
                        clipPath:
                            screenSize === "small"
                                ? clipPathSmall
                                : clipPathMedium,
                    }}
                >
                    <div
                        className="h-full md:h-full bg-ascend-blue md:ml-5 flex items-center p-5"
                        style={{
                            clipPath:
                                screenSize === "small"
                                    ? clipPathSmall
                                    : clipPathMedium,
                        }}
                    >
                        <div className=" text-white flex flex-col justify-center items-center p-10 w-full md:w-full">
                            <div className="z-10 text-center max-w-xs">
                                <h2 className="text-xl font-nunito-sans font-bold mb-2 mr-0">
                                    Not registered yet?
                                </h2>
                                <p className="mb-4 text-xl-1 font-nunito-sans">
                                    Register now to gain access and start your
                                    review journey!
                                </p>
                                <Link href={"/registration"}>
                                    <PrimaryButton
                                        text="Register"
                                        btnColor="bg-ascend-white"
                                        textColor="text-ascend-blue"
                                        className="mx-auto"
                                    ></PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.layout = null;
