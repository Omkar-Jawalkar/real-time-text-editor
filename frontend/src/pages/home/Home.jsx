import { socket } from "../../socket";
import { useState, useEffect } from "react";
const Home = () => {
    const [isConnected, setIsConnected] = useState(false);

    const onConnect = () => {
        setIsConnected(true);
    };

    useEffect(() => {
        socket.on("connect", onConnect);
        return () => {
            socket.off("connect", onConnect);
        };
    }, []);

    return (
        <div>
            <p> Is Connected - {isConnected ? "yes" : "no"}</p>
        </div>
    );
};

export default Home;
