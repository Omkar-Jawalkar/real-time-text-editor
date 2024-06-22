import {
    Text,
    Flex,
    Input,
    Link,
    Button,
    Heading,
    Divider,
    useToast,
    Code,
} from "@chakra-ui/react";
import { useState } from "react";
import { socket } from "../../socket";
import { useLocation, useNavigate } from "react-router-dom";
import navigatingFromHomeState from "../../atom/NavigatingFromHomeState";
import FetchForNewUserJoinedState from "../../atom/FetchForNewUserJoinedState";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const [navigating, setNavigating] = useRecoilState(navigatingFromHomeState);
    const [fetchForNewUserJoinedState, setFetchForNewUserJoinedState] =
        useRecoilState(FetchForNewUserJoinedState);

    const toast = useToast();

    const invalidUsernameOrRoomIdToast = () =>
        toast({
            title: "Please Fill complete information",
            status: "warning",
            duration: 5000,
            isClosable: true,
        });

    const isUsernameAndRoomIdValid = () => {
        if (username.length > 0 && roomId.length > 0) {
            return true;
        }
        invalidUsernameOrRoomIdToast();
        return false;
    };

    const handleJoinRoom = () => {
        // storing username in localstoreage

        localStorage.setItem("username", username);

        if (!socket.connected) {
            toast({
                title: "Connection to server lost, Please reload",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        socket.emit(
            "join-room",
            {
                roomId: roomId,
                username: username,
            },
            (error, message) => {
                if (error) {
                    toast({
                        title: message,
                        status: "error",
                        duration: 5000,
                    });
                } else {
                    setNavigating(true);
                    setFetchForNewUserJoinedState(true);
                    navigate(`/${roomId}`);
                }
            }
        );
    };

    const generateRandomRoomId = () => {
        let randomUniqueId = uuidv4();
        setRoomId(randomUniqueId);
    };

    return (
        <Flex
            margin={"auto"}
            my={"2xl"}
            padding={4} 
            gap={4}
            border={"1px"}
            borderRadius={"md"}
            borderColor={"gray"}
            flexDirection={"column"}
            minW={"xl"}
        >
            <Heading textAlign={"center"} size={"md"}>
                Welcome to{" "}
                <Code fontSize={"lg"} color={"purple"}>
                    Shareditor
                </Code>
            </Heading>
            <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                variant="outline"
                placeholder="Room Id"
            />
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outline"
                placeholder="Username"
            />
            <Button
                onClick={() => {
                    if (isUsernameAndRoomIdValid()) {
                        handleJoinRoom();
                    }
                }}
                colorScheme={"purple"}
            >
                Join
            </Button>
            <Divider />
            <Text textAlign={"center"}>
                Dont have a Room Id?{" "}
                <Link onClick={generateRandomRoomId} color={"purple"}>
                    {" "}
                    Create one{" "}
                </Link>{" "}
                and join :)
            </Text>
        </Flex>
    );
};

export default Home;
