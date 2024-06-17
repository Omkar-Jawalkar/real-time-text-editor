import { Flex } from "@chakra-ui/react";
import EditorSection from "./EditorSection";
import UsersSection from "./UsersSection";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";

const Room = () => {
    const { roomId } = useParams();
    // const fetchUsersInRoom = async () => {
    //     try {
    //         await fetch(`http://localhost:8080/users`, {
    //             roomId: roomId,
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //         // todo : show toast error
    //     }
    // };

    useEffect(() => {
        socket.emit("get-users", roomId);
        console.log("made event to get data");
    }, []);

    return (
        <Flex minH={"inherit"}>
            <EditorSection />
            <UsersSection />
        </Flex>
    );
};

export default Room;
