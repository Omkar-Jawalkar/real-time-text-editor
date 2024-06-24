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
import { colors } from "../../constants/colors";
import { useState, useEffect } from "react";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import navigatingFromHomeState from "../../atom/NavigatingFromHomeState";
import FetchForNewUserJoinedState from "../../atom/FetchForNewUserJoinedState";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import getRandomNumber from "../../constants/random";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const [navigating, setNavigating] = useRecoilState(navigatingFromHomeState);
    const [fetchForNewUserJoinedState, setFetchForNewUserJoinedState] =
        useRecoilState(FetchForNewUserJoinedState);

    const toast = useToast();

    const connectedToastMessage = () => {
        toast({
            title: "Connected to the Server",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

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
        let randomValue = getRandomNumber(0, colors.length - 1);
        let randomColor = colors[randomValue];
        localStorage.setItem("username", username);
        localStorage.setItem("color", randomColor);

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
                isRefreshing: false,
                color: randomColor,
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
                    scroll(0, 0);
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
            minW={{ md: "xl" }}
        >
            <Heading textAlign={"center"} size={"md"}>
                Welcome to
                <Code ml={1} fontSize={"lg"} color={"purple.500"}>
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
                <Code
                    cursor={"pointer"}
                    bg={"white"}
                    fontWeight={"bold"}
                    onClick={generateRandomRoomId}
                    color={"purple.500"}
                    as={"u"}
                    textUnderlineOffset={4}
                >
                    {" "}
                    Create one{" "}
                </Code>{" "}
                and join :)
            </Text>
        </Flex>
    );
};

export default Home;
