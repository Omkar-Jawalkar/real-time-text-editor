import { Code, Flex, Button } from "@chakra-ui/react";
import User from "./User";
// import { users } from "../../constants/users";
import usersState from "../../atom/UsersState";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";

const UsersSection = () => {
    const [users] = useRecoilState(usersState);
    const { roomId } = useParams();
    const navigate = useNavigate();
    
    return (
        <Flex flexDirection={"column"} gap={4} flex={2} paddingTop={20}>
            <Code colorScheme="purple" textAlign={"center"}>
                Collaborators
            </Code>
            {users?.map((user) => (
                <User key={user?.socketId} {...user} />
            ))}
            <Button
                onClick={() => {
                    socket.emit("leave-room", socket.id, roomId);
                    localStorage.clear();
                    navigate("/");
                }}
                color={"purple"}
            >
                Leave Room
            </Button>
        </Flex>
    );
};

export default UsersSection;
