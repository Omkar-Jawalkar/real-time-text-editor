import {
    Text,
    Flex,
    Input,
    Link,
    Button,
    Heading,
    Divider,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
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

    const handleJoinRoom = () => {};

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
                Welcome to Shareditor
            </Heading>
            <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                variant="filled"
                placeholder="Room Id"
            />
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="filled"
                placeholder="Username"
            />
            <Button
                onClick={() => {
                    if (isUsernameAndRoomIdValid()) {
                        handleJoinRoom();
                    }
                }}
                variant={"outline"}
            >
                Join
            </Button>
            <Divider paddingY={2} />
            <Text textAlign={"center"}>
                Dont have a Room Id? <Link color={"teal"}> Create one </Link>{" "}
                and join :)
            </Text>
        </Flex>
    );
};

export default Home;
