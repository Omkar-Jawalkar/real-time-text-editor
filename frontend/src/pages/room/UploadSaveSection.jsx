import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const UploadSaveSection = () => {
    return (
        <Flex py={2} justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"lg"}>Room Id - </Heading>
            <Flex gap={4}>
                <Button colorScheme="purple">Upload</Button>
                <Button colorScheme="purple">Save</Button>
            </Flex>
        </Flex>
    );
};

export default UploadSaveSection;
