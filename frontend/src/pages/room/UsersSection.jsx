import { Button, Code, Flex } from "@chakra-ui/react";
import User from "./User";
// import { users } from "../../constants/users";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import navigatingFromHomeState from "../../atom/NavigatingFromHomeState";
import usersState from "../../atom/UsersState";
import { socket } from "../../socket";

const UsersSection = () => {
    const [users] = useRecoilState(usersState);
    const [navigateState, setNavigateState] = useRecoilState(
        navigatingFromHomeState
    );
    const { roomId } = useParams();
    const navigate = useNavigate();

    return (
        <Flex flexDirection={"column"} gap={2} flex={2} paddingTop={20}>
            <Code fontWeight={"extrabold"} bg={"white"}>
                Collaborators:
            </Code>
            {users?.map((user) => (
                <User key={user?.socketId} {...user} />
            ))}
            <Button
                onClick={() => {
                    socket.emit("leave-room", socket.id, roomId);
                    setNavigateState(false);
                    localStorage.clear();
                    navigate("/");
                    location.reload();
                }}
                mt={4}
                color={"purple"}
            >
                Leave Room
            </Button>
        </Flex>
    );
};

export default UsersSection;
