import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "../../../../../../../css/docViewer.css";

export default function DocumentViewer({ isFullScreen }) {
    // Sample pdf in public folder
    const docs = [{ uri: "/sample.pdf" }];

    return (
        <div
            className={`${
                isFullScreen ? "px-0" : "px-5 lg:px-[200px]"
            }  flex flex-col justify-center items-center`}
        >
            <DocViewer
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: false,
                        retainURLParams: false,
                    },
                    csvDelimiter: ",",
                    pdfZoom: {
                        defaultZoom: 0.8,
                        zoomJump: 0.2,
                    },
                    pdfVerticalScrollByDefault: true,
                }}
                className=""
                documents={docs}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    );
}
