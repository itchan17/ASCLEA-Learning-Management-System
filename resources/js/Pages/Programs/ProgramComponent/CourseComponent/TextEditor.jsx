import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../../../../css/quillTextEditor.css";

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
    const module = {
        toolbar: toolBarOptions,
        uploader: {
            handler: () => {},
        },
    };
    console.log(value);
    return (
        <ReactQuill
            value={value}
            modules={module}
            theme="snow"
            onChange={(val) => {
                console.log(val);
                setValue(fieldName, val);
            }}
        />
    );
}
