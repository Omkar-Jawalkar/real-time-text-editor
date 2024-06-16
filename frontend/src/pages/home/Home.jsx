import { socket } from "../../socket";
import { useState, useEffect } from "react";

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [joinedRoomId, setJoinedRoomId] = useState(false);
    const [roomMessages, setRoomMessages] = useState([]);
    const [textMessage, setTextMessage] = useState("");

    useEffect(() => {
        socket.on("connect", () => {});

        return () => {
            socket.off("connect", () => {});
        };
    }, []);

    return (
        <div>
            <h1>Nakul</h1>
        </div>
    );
};

export default Home;
