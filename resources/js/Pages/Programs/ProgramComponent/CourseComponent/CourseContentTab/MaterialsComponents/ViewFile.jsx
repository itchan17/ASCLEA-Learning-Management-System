import { useState } from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { MdOutlineCloseFullscreen, MdOutlineFullscreen } from "react-icons/md";
import DocumentViewer from "./DocumentViewer";
import { handleClickBackBtn } from "../../../../../../Utils/handleClickBackBtn";

export default function ViewFile() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleCLickFullscreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div
            className={`${
                isFullScreen
                    ? "fixed inset-0 z-50 bg-white h-screen w-screen"
                    : "relative space-y-5"
            }  font-nunito-sans text-ascend-black`}
        >
            {!isFullScreen ? (
                <div className="bg-ascend-white w-full flex gap-5 items-center justify-between">
                    <BackButton doSomething={handleClickBackBtn} />

                    <div className="flex items-center justify-end w-full">
                        <div className="flex items-center w-full">
                            <h1 className="truncate text-size4 w-0 flex-grow text-end">
                                sample.pasdddddddddddddddddddddddddddddddddddddddf
                            </h1>
                            <h1 className="text-size4 flex-shrink-0">.pdf</h1>
                            <div
                                title="Fullscreen"
                                className="cursor-pointer rounded-4xl ml-5 p-3 -mr-3 hover-change-bg-color"
                                onClick={handleCLickFullscreen}
                            >
                                <MdOutlineFullscreen className="text-size7" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    title="Exit Fullscreen"
                    className="absolute z-50 bottom-3 right-3 cursor-pointer rounded-4xl p-3 hover:bg-ascend-white transition-all duration-300"
                    onClick={handleCLickFullscreen}
                >
                    <MdOutlineCloseFullscreen className="text-size5 text-ascend-black" />
                </div>
            )}

            <DocumentViewer isFullScreen={isFullScreen} />
        </div>
    );
}

{
    /* <div className="bg-ascend-white w-full flex gap-5 items-center justify-between">
    <BackButton doSomething={handleCLickBackBtn} />

    <div className="flex items-center justify-end w-full">
        <div className="flex items-center w-full">
            <h1 className="truncate text-size4 w-0 flex-grow text-end">
                sample.pasdddddddddddddddddddddddddddddddddddddddf
            </h1>
            <h1 className="text-size4 flex-shrink-0">.pdf</h1>
        </div>
    </div>
</div>; */
}
{
    /* <div
    title="Fullscreen"
    className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color"
    onClick={handleCLickFullscreen}
>
    <MdOutlineFullscreen className="text-size7" />
</div>; */
}
