import { Code, Flex } from "@chakra-ui/react";
import User from "./User";
// import { users } from "../../constants/users";
import usersState from "../../atom/UsersState";
import { useRecoilState } from "recoil";

const UsersSection = () => {
    const [users] = useRecoilState(usersState);

    return (
        <Flex flexDirection={"column"} gap={4} flex={2} paddingTop={20}>
            <Code colorScheme="purple" textAlign={"center"}>
                Collaborators
            </Code>
            {users?.map((user) => (
                <User key={user?.socketId} {...user} />
            ))}
        </Flex>
    );
};

export default UsersSection;
