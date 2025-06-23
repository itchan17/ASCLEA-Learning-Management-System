import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "../../../../../../../css/docViewer.css";

export default function DocumentViewer() {
    // Sample pdf in public folder
    const docs = [{ uri: "/sample.pdf" }];

    return (
        <div className="flex flex-col justify-center items-center -mx-6 sm:mx-0">
            <DocViewer
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: false,
                        retainURLParams: false,
                    },
                    csvDelimiter: ",",
                    pdfZoom: {
                        defaultZoom: 1,
                        zoomJump: 0.2,
                    },
                    pdfVerticalScrollByDefault: true,
                }}
                theme={{
                    textPrimary: "#313131",
                    disableThemeScrollbar: false,
                }}
                documents={docs}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    );
}
