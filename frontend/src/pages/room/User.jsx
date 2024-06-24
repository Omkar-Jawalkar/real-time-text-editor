import { Code, Flex } from "@chakra-ui/react";
import { socket } from "../../socket";

const User = ({ socketId, username, color }) => {
    return (
        <Flex>
            <Code fontWeight={"bold"} bg={color}>
                {username} {socket.id === socketId && "(You)"}{" "}
            </Code>
        </Flex>
    );
};

export default User;
