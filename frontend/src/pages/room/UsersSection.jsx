import { Flex } from "@chakra-ui/react";
import User from "./User";
import { users } from "../../constants/users";

const UsersSection = () => {
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
