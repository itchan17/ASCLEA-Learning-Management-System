import { useState } from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { MdOutlineCloseFullscreen, MdOutlineFullscreen } from "react-icons/md";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import DocumentViewer from "./DocumentViewer";

export default function ViewFile() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const route = useRoute();
    const handleCLickBackBtn = () => {
        router.visit(
            route("program.course.material.view", {
                programId: 1,
                courseId: 1,
                materialId: 1,
            })
        );
    };

    const handleCLickFullscreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className="relative space-y-5 font-nunito-sans text-ascend-black">
            {!isFullScreen ? (
                <>
                    <nav className="h-16 lg:h-20 w-full flex items-center justify-between px-5 lg:px-[100px]">
                        <img
                            src="/images/ascend_logo.png"
                            alt=""
                            className="w-30"
                        />
                    </nav>
                    <div className="w-full flex gap-5 items-center px-5 lg:px-[100px]">
                        <BackButton doSomething={handleCLickBackBtn} />
                    </div>
                    <div className="w-full flex gap-5 items-center px-5 lg:px-[200px]">
                        <h1 className="w-full truncate text-size4">
                            sample.pdf
                        </h1>

                        <div
                            title="Fullscreen"
                            className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color"
                            onClick={handleCLickFullscreen}
                        >
                            <MdOutlineFullscreen className="text-size7" />
                        </div>
                    </div>
                </>
            ) : (
                <div
                    title="Exit Fullscreen"
                    className="absolute z-50 -bottom-3 right-3 cursor-pointer rounded-4xl p-3 hover-change-bg-color"
                    onClick={handleCLickFullscreen}
                >
                    <MdOutlineCloseFullscreen className="text-size5" />
                </div>
            )}

            <DocumentViewer isFullScreen={isFullScreen} />
        </div>
    );
}

ViewFile.layout = null;
