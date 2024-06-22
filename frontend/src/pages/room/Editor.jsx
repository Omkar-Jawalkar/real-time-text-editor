import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";

const Editor = () => {
    const editorRef = useRef("");
    const [loading, setLoading] = useState(true);

    const fetchEditorContent = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/editor-content/?roomId=${roomId}&socketId=${socket.id}`
            );
            const { data } = await response.json();

            if (data?.isContentComming === false) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEditorContent();
    }, []);

    const { roomId } = useParams();

    useEffect(() => {
        // let delta = editorRef.current.getEditor().getContents();
        if (editorRef.current) {
            editorRef.current
                .getEditor()
                .on("text-change", (delta, oldDelta, source) => {
                    if (source === "user") {
                        console.log(delta);
                        // sending just changes
                        socket.emit("send-editor-content", roomId, delta);
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            setLoading(false);
            socket.on(
                "recieve-editor-content-to-joined-user",
                (wholeEditorContent) => {
                    editorRef.current
                        .getEditor()
                        .setContents(wholeEditorContent, "api");
                }
            );
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

    useEffect(() => {
        if (editorRef.current) {
            socket.on(
                "make-emit-to-send-editor-content-to-joined-user",
                (socketIdToEmitWholeEditorContent) => {
                    const wholeDocumentDelta = editorRef.current
                        .getEditor()
                        .getContents();

                    //Sending Whole doc
                    socket.emit(
                        "send-editor-content-to-joined-user",
                        roomId,
                        socketIdToEmitWholeEditorContent,
                        wholeDocumentDelta
                    );
                }
            );
        }
    }, []);

    return (
        <>
            {loading && <h1>Loading....</h1>}
            <ReactQuill
                ref={editorRef}
                placeholder="Share the link to invite collaborators to your document."
                style={{ height: "100%" }}
                theme="snow"
                // onChange={setEditorState}
            />
        </>
    );
};

export default Editor;
    