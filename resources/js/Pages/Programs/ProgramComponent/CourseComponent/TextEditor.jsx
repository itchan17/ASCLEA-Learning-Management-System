import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../../../../css/quillTextEditor.css";
import { useMemo } from "react";

export default function TextEditor({ value, setValue, fieldName }) {
    const toolBarOptions = [
        [
            { header: [1, 2, 3, false] },
            "bold",
            "italic",
            "underline",
            { list: "ordered" },
            { list: "bullet" },
            "link",
        ],

        ["clean"],
    ];

    const module = useMemo(
        () => ({
            toolbar: toolBarOptions,
            uploader: { handler: () => {} },
        }),
        []
    );

    return (
        <ReactQuill
            value={value}
            modules={module}
            theme="snow"
            onChange={(val) => {
                const newVal = val === "<p><br></p>" ? null : val;

                if (newVal !== value) {
                    setValue(fieldName, newVal);
                }
            }}
        />
    );
}
