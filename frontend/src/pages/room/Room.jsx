import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Room = () => {
    const { roomId } = useParams();

    const fetchUsersInRoom = () => {};

    useEffect(() => {
        fetchUsersInRoom();
    }, []);

    return <div>Room - {roomId}</div>;
};

export default Room;
