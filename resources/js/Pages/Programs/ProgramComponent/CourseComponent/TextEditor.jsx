import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../../../../css/quillTextEditor.css";

export default function TextEditor({ value, setValue }) {
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
    const module = { toolbar: toolBarOptions };
    console.log(value);
    return (
        <ReactQuill
            modules={module}
            theme="snow"
            value={value}
            onChange={setValue}
        />
    );
}
