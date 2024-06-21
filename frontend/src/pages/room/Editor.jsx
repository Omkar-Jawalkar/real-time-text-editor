import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";

const Editor = () => {
    const editorRef = useRef("");
    const { roomId } = useParams();

    useEffect(() => {
        // let delta = editorRef.current.getEditor().getContents();
        if (editorRef.current) {
            editorRef.current.getEditor().on("text-change", (delta) => {
                socket.emit("send-editor-content", roomId, delta);
            });
        }
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            socket.on("receive-editor-content", (editorContent) => {
                editorRef.current
                    .getEditor()
                    .updateContents(editorContent, "api");
            });
        }
    }, []);

    return (
        <ReactQuill
            ref={editorRef}
            style={{ height: "100%" }}
            theme="snow"
            // onChange={setEditorState}
        />
    );
};

export default Editor;
