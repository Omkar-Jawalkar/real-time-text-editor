import { useParams } from "react-router-dom";
const Room = () => {
    const { roomId } = useParams();

    return <div>Room - {roomId}</div>;
};

export default Room;
