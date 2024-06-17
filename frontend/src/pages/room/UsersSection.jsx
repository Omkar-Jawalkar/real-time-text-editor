import { Flex } from "@chakra-ui/react";
import User from "./User";
// import { users } from "../../constants/users";
import usersState from "../../atom/UsersState";
import { useRecoilState } from "recoil";

const UsersSection = () => {
    const [users] = useRecoilState(usersState);
    return (
        <Flex flexDirection={"column"} flex={2} padding={4}>
            Connected Users :
            {users?.map((user) => (
                <User key={user?.socketId} {...user} />
            ))}
        </Flex>
    );
};

export default UsersSection;
