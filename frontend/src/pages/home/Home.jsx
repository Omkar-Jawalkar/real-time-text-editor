import { socket } from "../../socket";
import { useState, useEffect } from "react";

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [joinedRoomId, setJoinedRoomId] = useState(false);
    const [roomMessages, setRoomMessages] = useState([]);
    const [textMessage, setTextMessage] = useState("");

    const sendMessageCallback = (message) => {
        setRoomMessages((prev) => [...prev, message]);
    };

    const sendMessage = () => {
        socket.emit("send-message", roomId, textMessage, sendMessageCallback);
    };

    useEffect(() => {
        console.log("room message - " + roomMessages);
    }, [roomMessages]);

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value);
    };

    const joinRoomCallback = (message) => {
        setRoomMessages((prev) => [...prev, message]);
    };

    const createRoomAndJoin = () => {
        setRoomId(roomId);
        localStorage.setItem("roomId", roomId);
        socket.emit("join-room", roomId, joinRoomCallback);
        setJoinedRoomId(true);
    };

    const onConnect = () => {
        setIsConnected(true);
    };

    useEffect(() => {
        socket.on("connect", onConnect);

        socket.on("room-messages", (message) => {
            setRoomMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("connect", onConnect);
        };
    }, []);

    return (
        <div>
            <h1>Nakul</h1>
            <p> Is Connected - {isConnected ? "yes" : "no"}</p>
            Message -{" "}
            <input
                type="text"
                onChange={(e) => {
                    setTextMessage(e.target.value);
                }}
                value={textMessage}
            />
            <button onClick={sendMessage} type="button">
                Send
            </button>
            <br />
            Room - <input onChange={handleRoomIdChange} value={roomId} />
            <button onClick={createRoomAndJoin} type="button">
                Join
            </button>
            <p>
                RoomId - {roomId} - joined - {joinedRoomId ? " yes" : "no"}
            </p>
            <h1>Messages</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {roomMessages?.map((message, index) => {
                    return <div key={index}>{message}</div>;
                })}
            </div>
        </div>
    );
};

export default Home;
