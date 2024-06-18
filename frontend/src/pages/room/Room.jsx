import { Flex } from "@chakra-ui/react";
import EditorSection from "./EditorSection";
import UsersSection from "./UsersSection";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";

const Room = () => {
    const { roomId } = useParams();


    useEffect(()=>{
        
    },[])

    return (
        <Flex minH={"inherit"}>
            <EditorSection />
            <UsersSection />
        </Flex>
    );
};

export default Room;
