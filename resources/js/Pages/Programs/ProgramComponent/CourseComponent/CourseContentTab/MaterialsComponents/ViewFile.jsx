import { useState } from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "../../../../../../../css/docViewer.css";
import { MdOutlineCloseFullscreen, MdOutlineFullscreen } from "react-icons/md";

export default function ViewFile() {
    const [isFullSCreen, setIsFullScreen] = useState(false);
    const docs = [{ uri: "/sample.pdf" }];

    const handleCLickFullscreen = () => {
        setIsFullScreen(!isFullSCreen);
    };

    return (
        <div className="relative space-y-5 font-nunito-sans text-ascend-black">
            {isFullSCreen && (
                <div
                    className="absolute z-50 -bottom-3 right-3 cursor-pointer rounded-4xl p-3 hover-change-bg-color"
                    onClick={handleCLickFullscreen}
                >
                    <MdOutlineCloseFullscreen className="text-size5" />
                </div>
            )}
            {!isFullSCreen && (
                <>
                    <nav className="h-16 lg:h-20 w-full flex items-center justify-between px-5 lg:px-[100px]">
                        <img
                            src="/images/ascend_logo.png"
                            alt=""
                            className="w-30"
                        />
                    </nav>
                    <div className="relative flex items-center gap-5 px-5 lg:px-[100px]">
                        <BackButton />
                        <div className="w-full flex items-center justify-between">
                            <h1>sample.pdf</h1>
                            <div
                                className="cursor-pointer rounded-4xl p-3 -mr-3 hover-change-bg-color"
                                onClick={handleCLickFullscreen}
                            >
                                <MdOutlineFullscreen className="text-size7" />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div
                className={`${
                    isFullSCreen ? "px-0" : "px-5 lg:px-[100px]"
                }  flex flex-col justify-center items-center`}
            >
                <DocViewer
                    config={{
                        header: {
                            disableHeader: true,
                            disableFileName: false,
                            retainURLParams: false,
                        },
                        csvDelimiter: ",", // "," as default,
                        pdfZoom: {
                            defaultZoom: 1, // 1 as default,
                            zoomJump: 0.2, // 0.1 as default,
                        },
                        pdfVerticalScrollByDefault: true,
                    }}
                    className=""
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                />
            </div>
        </div>
    );
}

ViewFile.layout = null;
