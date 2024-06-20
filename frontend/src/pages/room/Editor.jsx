import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import EditorContextState from "../../atom/EditorContextState";
import { useRecoilState } from "recoil";

const Editor = () => {
    const editorRef = useRef("");
    const [editorState, setEditorState] = useRecoilState(EditorContextState);
    const { roomId } = useParams();

    useEffect(() => {
        let delta = editorRef.current.getEditor().getContents();

        // here ops is the content
        socket.emit("send-editor-content", roomId, delta);

        socket.on("receive-editor-content", (editorContent) => {
            console.log(editorContent);
            editorRef.current.getEditor().setContents(editorContent);
        });
    }, [editorState, socket]);

    return (
        <ReactQuill
            ref={editorRef}
            style={{ height: "100%" }}
            theme="snow"
            value={editorState}
            onChange={setEditorState}
        />
    );
};

export default Editor;
