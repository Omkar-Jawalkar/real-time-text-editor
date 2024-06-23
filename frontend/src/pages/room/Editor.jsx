import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import QuillCursors from "quill-cursors";
import { Quill } from "react-quill";
import { socket } from "../../socket";
import usersState from "../../atom/UsersState";
import { useRecoilState } from "recoil";
import "./cursor.css";

Quill.register("modules/cursors", QuillCursors);

const Editor = () => {
    const editorRef = useRef("");
    const cursorsRef = useRef(false);
    const [loading, setLoading] = useState(true);
    const [users] = useRecoilState(usersState);
    const username = localStorage.getItem("username");
    const color = localStorage.getItem("color");
    const { roomId } = useParams();
    const hashMapRef = useRef({});

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
        if (editorRef.current) {
            const quill = editorRef.current.getEditor();
            const cursors = quill.getModule("cursors");
            cursorsRef.current = cursors;
        }
    }, []);

    // useEffect(() => {
    //     if (cursorsRef.current) {
    //         users.map((user) => {
    //             if (!hashMapRef.current[user?.socketId]) {
    //                 cursorsRef.current.createCursor(
    //                     user?.socketId,
    //                     user?.username,
    //                     user?.color
    //                 );
    //                 hashMapRef.current[user.socketId] = user;
    //             }
    //         });
    //     }
    // }, [users]);

    // useEffect for fetching editor content
    useEffect(() => {
        fetchEditorContent();
    }, []);

    //  send-editor-content && send-cursor-changes
    useEffect(() => {
        if (editorRef.current) {
            let quill = editorRef.current.getEditor();

            quill.on("text-change", (delta, oldDelta, source) => {
                if (source === "user") {
                    const range = quill.getSelection();
                    socket.emit("send-editor-content", roomId, delta);
                    socket.emit(
                        "send-cursor-changes",
                        roomId,
                        socket.id,
                        username,
                        color,
                        range
                    );
                }
            });
        }
    }, []);

    // recieve-editor-content
    useEffect(() => {
        if (editorRef.current) {
            socket.on("receive-editor-content", (editorContent, range) => {
                editorRef.current
                    .getEditor()
                    .updateContents(editorContent, "api");

                // todo:  For that specific cursor update the cursor
            });
        }
    }, []);

    // recieve-cursor-changes

    // recieve-cursor-changes
    useEffect(() => {
        if (editorRef.current) {
            socket.on(
                "recieve-cursor-changes",
                (socketId, username, color, range) => {
                    console.log(socketId, range);

                    if (!hashMapRef.current[socketId]) {
                        console.log("creating new cursor");
                        let cursor = cursorsRef.current.createCursor(
                            socketId,
                            username,
                            color
                        );
                        console.log(cursor);
                        cursorsRef.current.toggleFlag(socketId, true);
                        cursorsRef.current.moveCursor(socketId, range);

                        hashMapRef.current[socketId] = cursor;
                    } else {
                        console.log("updating previous cursor");
                        console.log(cursorsRef.current);
                        cursorsRef.current.toggleFlag(socketId, true);
                        cursorsRef.current.moveCursor(socketId, range);
                    }
                }
            );
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

    // register cursor

    return (
        <>
            {loading && <h1>Loading....</h1>}
            <ReactQuill
                ref={editorRef}
                placeholder="Share the code to invite collaborators to your document."
                style={{ height: "70%" }}
                theme="snow"
                modules={{
                    cursors: {
                        transformOnTextChange: true,
                    },
                }}
                // onChange={setEditorState}
            />
        </>
    );
};

export default Editor;
