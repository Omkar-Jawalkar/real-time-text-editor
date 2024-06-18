import { Flex, useToast } from "@chakra-ui/react";
import EditorSection from "./EditorSection";
import UsersSection from "./UsersSection";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";
import navigatingFromHomeState from "../../atom/NavigatingFromHomeState";
import { useRecoilState } from "recoil";

const Room = () => {
    const { roomId } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [navigating] = useRecoilState(navigatingFromHomeState);

    const joinRoomAfterRefresh = () => {
        let username = localStorage.getItem("username");

        // if socked disconnect then redirect to login
        // if (!socket.connected) {
        //     toast({
        //         title: "Connection to server lost, Please reload",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //     });
        //     return;
        // }

        // if username is not present then redirect to login
        if (!username) {
            navigate("/");
            return;
        }

        console.log("roomId", roomId);

        socket.emit(
            "join-room",
            {
                roomId: roomId,
                username: username,
            },
            (isError, message) => {
                if (isError) {
                    toast({
                        title: message,
                        status: "error",
                        duration: 5000,
                    });
                }
            }
        );
    };

    useEffect(() => {
        console.log("navigating", navigating);
        if (!navigating) {
            joinRoomAfterRefresh();
        }
    }, [socket]);

    if (!username) {
        navigate("/");
        return;
    }

    return (
        <Flex minH={"inherit"}>
            {"roonm id" + roomId}
            <EditorSection />
            <UsersSection />
        </Flex>
    );
};

export default Room;
