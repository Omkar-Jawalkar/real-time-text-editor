import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
    const [value, setValue] = useState("");
    return (
        <ReactQuill
            style={{ height: "100%" }}
            theme="snow"
            value={value}
            onChange={setValue}
        />
    );
};

export default Editor;
