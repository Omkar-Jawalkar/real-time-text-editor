import { Flex, useToast } from "@chakra-ui/react";
import EditorSection from "./EditorSection";
import UsersSection from "./UsersSection";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { socket } from "../../socket";
import navigatingFromHomeState from "../../atom/NavigatingFromHomeState";
import { useRecoilState } from "recoil";

const Room = () => {
    const { roomId } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");

    const [navigating] = useRecoilState(navigatingFromHomeState);

    const joinRoomAfterRefresh = () => {
        let username = sessionStorage.getItem("username");
        let color = sessionStorage.getItem("color");

        // if username is not present then redirect to login
        if (!username) {
            navigate("/");
            return;
        }

        socket.emit(
            "join-room",
            {
                roomId: roomId,
                username: username,
                isRefreshing: true,
                color: color,
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
        if (!navigating) {
            joinRoomAfterRefresh();
        }
    }, [socket]);

    if (!username) {
        navigate("/", {
            state: {
                roomId: roomId,
            },
        });
        return;
    }

    return (
        <Flex
            flexDirection={{ base: "column", sm: "row" }}
            w={"full"}
            mt={{ base: 1, sm: 8 }}
            gap={{ base: 1, sm: 6 }}
            px={4}
            minH={"inherit"}
        >
            <EditorSection />
            <UsersSection />
        </Flex>
    );
};

export default Room;
