import { useState } from "react";
import BackButton from "../../../../../../../Components/Button/BackButton";
import { MdOutlineCloseFullscreen, MdOutlineFullscreen } from "react-icons/md";
import DocumentViewer from "./DocumentViewer";
import { handleClickBackBtn } from "../../../../../../../Utils/handleClickBackBtn";
import { MdOutlineFileDownload } from "react-icons/md";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ViewFile({
    fileName,
    programId,
    courseId,
    assessmentId,
    fileId,
}) {
    // URLs where the file can be access and download
    const fileUrl = route("program.course.file.stream", {
        program: programId,
        course: courseId,
        assessment: assessmentId,
        file: fileId,
    });
    const fileDownload = route("program.course.file.download", {
        program: programId,
        course: courseId,
        assessment: assessmentId,
        file: fileId,
    });
    const { auth } = usePage().props;

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
                <>
                    <div className="bg-ascend-white w-full flex gap-5 items-center justify-between">
                        <div className="flex items-center justify-start w-full gap-5">
                            <BackButton doSomething={handleClickBackBtn} />
                            <div className="flex items-center w-full"></div>
                        </div>

                        <div className="flex items-center justify-end">
                            {/* Only display the download button for admin and fcaulty */}
                            {auth.user.role_name !== "student" && (
                                <a
                                    href={fileDownload}
                                    title={`Download ${fileName}`}
                                    className="cursor-pointer rounded-4xl  p-3 hover-change-bg-color"
                                >
                                    <MdOutlineFileDownload className="text-size7" />
                                </a>
                            )}
                            <div
                                title="Fullscreen"
                                className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color"
                                onClick={handleCLickFullscreen}
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
                    onClick={handleCLickFullscreen}
                >
                    <MdOutlineCloseFullscreen className="text-size5 text-ascend-black" />
                </div>
            )}

            <DocumentViewer fileUrl={fileUrl} isFullScreen={isFullScreen} />
        </div>
    );
}
