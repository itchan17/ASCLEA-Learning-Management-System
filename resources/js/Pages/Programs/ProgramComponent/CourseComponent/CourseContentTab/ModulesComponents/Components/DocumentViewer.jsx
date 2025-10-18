import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "../../../../../../../../css/docViewer.css";

export default function DocumentViewer({ fileUrl }) {
    // Sample pdf in public folder
    const docs = [{ uri: fileUrl }];

    return (
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
            documents={docs}
            pluginRenderers={DocViewerRenderers}
        />
    );
}
