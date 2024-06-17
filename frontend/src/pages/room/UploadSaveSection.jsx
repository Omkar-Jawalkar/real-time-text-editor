import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const UploadSaveSection = () => {
    const { roomId } = useParams();
    return (
        <Flex py={2} justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"lg"}>Room Id - {roomId} </Heading>
            <Flex gap={4}>
                <Button colorScheme="purple">Upload</Button>
                <Button colorScheme="purple">Save</Button>
            </Flex>
        </Flex>
    );
};

export default UploadSaveSection;
