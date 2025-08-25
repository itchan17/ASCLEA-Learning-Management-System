import React from "react";

export default function ErrorPage({ status }) {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    const imgSrc = {
        503: "/images/illustrations/503.svg",
        500: "/images/illustrations/500.svg",
        404: "/images/illustrations/404.svg",
        403: "/images/illustrations/403.svg",
    }[status];

    return (
        <div className="flex flex-col items-center justify-center border h-screen">
            <img src={imgSrc} alt="" className="w-60 md:w-80" />
            <div className="flex flex-col items-center justify-center font-nunito-sans px-5">
                <h1 className="text-4xl md:text-6xl font-black">
                    Error {status}
                </h1>
                <div className="italic text-size4 md:text-size5 text-center">
                    {description}
                </div>
            </div>
        </div>
    );
}

ErrorPage.layout = null;
