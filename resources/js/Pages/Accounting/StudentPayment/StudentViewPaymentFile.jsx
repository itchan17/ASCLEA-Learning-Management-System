import { useState } from "react";
import BackButton from "../../../Components/Button/BackButton";
import { MdOutlineCloseFullscreen, MdOutlineFullscreen } from "react-icons/md";
import DocumentViewer from "./StudentDocumentViewerPayment";
import { handleClickBackBtn } from "../../../Utils/handleClickBackBtn";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ViewFile({ fileName, paymentId, fileId }) {
    const fileUrl = route("paymenthistory.student.payment.file.stream", { paymentId, fileId });
    
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toggleFullscreen = () => setIsFullScreen(!isFullScreen);

    return (
        <div
            className={`${
                isFullScreen
                    ? "fixed inset-0 z-50 bg-white h-screen w-screen"
                    : "relative space-y-5"
            } font-nunito-sans text-ascend-black`}
        >
            {!isFullScreen ? (
                <>
                    <div className="bg-ascend-white w-full flex gap-5 items-center justify-between">
                        <div className="flex items-center justify-start w-full gap-5">
                            <BackButton doSomething={handleClickBackBtn} />
                            <div className="flex items-center w-full"></div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div
                                title="Fullscreen"
                                className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color"
                                onClick={toggleFullscreen}
                            >
                                <MdOutlineFullscreen className="text-size7" />
                            </div>
                        </div>
                    </div>
                    <h1
                        title={fileName}
                        className="text-size4 text-start cursor-default"
                    >
                        {fileName}
                    </h1>
                </>
            ) : (
                <div
                    title="Exit Fullscreen"
                    className="absolute z-50 bottom-3 right-3 cursor-pointer rounded-4xl p-3 hover:bg-ascend-white transition-all duration-300"
                    onClick={toggleFullscreen}
                >
                    <MdOutlineCloseFullscreen className="text-size5 text-ascend-black" />
                </div>
            )}

            <DocumentViewer fileUrl={fileUrl} isFullScreen={isFullScreen} />
        </div>
    );
}
