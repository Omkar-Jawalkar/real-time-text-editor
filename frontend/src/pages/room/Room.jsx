import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import EditorSection from "./EditorSection";
import UsersSection from "./UsersSection";
import { RecoilRoot } from "recoil";

const Room = () => {
    const { roomId } = useParams();
    const [users, setUsers] = useState();

    const fetchUsersInRoom = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users`, {
                roomId: roomId,
            });
            const data = await response.json();
            setUsers(data?.users);
        } catch (error) {
            console.log(error.message);
            // todo : show toast error
        }
    };

    useEffect(() => {
        fetchUsersInRoom();
    }, []);

    return (
        <RecoilRoot>
            <Flex minH={"inherit"}>
                <EditorSection />
                <UsersSection users={users} />
            </Flex>
        </RecoilRoot>
    );
};

export default Room;
