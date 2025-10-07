import React from "react";
import { MdOutlineClose } from "react-icons/md";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "../../css/docViewer.css";
import { MdOutlineFileDownload } from "react-icons/md";
import RoleGuard from "./Auth/RoleGuard";

export default function ModalDocViewer({
    onClose,
    fileUrl,
    fileName,
    fileDownload = null,
}) {
    return (
        <div className="fixed inset-0 bg-ascend-black z-[999] flex flex-col h-screen overflow-y-auto font-nunito-sans">
            <div className="sticky z-999 top-0 flex items-center justify-between px-5 py-2 w-full bg-ascend-white text-ascend-black gap-2 shadow">
                <div className="flex items-center gap-5 flex-1 min-w-0">
                    <h1 className="text-size-4 font-semibold truncate">
                        {fileName}
                    </h1>
                    <RoleGuard allowedRoles={["admin", "faculty"]}>
                        {fileDownload && (
                            <a
                                href={fileDownload}
                                title={`Download ${fileName}`}
                                className="cursor-pointer rounded-4xl p-2 hover-change-bg-color"
                            >
                                <MdOutlineFileDownload className="text-size4" />
                            </a>
                        )}
                    </RoleGuard>
                </div>

                <div
                    onClick={onClose}
                    className="-mr-2 p-2 rounded-4xl hover:bg-ascend-lightblue transition-colors duration-200 cursor-pointer"
                >
                    <MdOutlineClose className="text-size4 text-ascend-black" />
                </div>
            </div>

            <div className="flex-1">
                <DocViewer
                    config={{
                        header: {
                            disableHeader: true,
                            disableFileName: false,
                            retainURLParams: false,
                        },
                        csvDelimiter: ",",
                        pdfZoom: {
                            defaultZoom: 0.5,
                            zoomJump: 0.2,
                        },
                        pdfVerticalScrollByDefault: true,
                    }}
                    theme={{
                        textPrimary: "#313131",
                        disableThemeScrollbar: false,
                    }}
                    documents={[{ uri: fileUrl }]}
                    pluginRenderers={DocViewerRenderers}
                />
            </div>
        </div>
    );
}
