import { Button, Flex, useToast, Code, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

const UploadSaveSection = () => {
    const toast = useToast();
    const { roomId } = useParams();

    const copySharingLinkToClipboard = () => {
        navigator.clipboard.writeText(roomId);
        toast({
            title: `Code copied`,
            position: "top",
            status: "success",
            isClosable: true,
        });
    };

    return (
        <Flex py={2} justifyContent={"space-between"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                <Code colorScheme="purple" fontSize={"lg"}>
                    Sharing Code
                </Code>
                <IconButton
                    onClick={copySharingLinkToClipboard}
                    size={"sm"}
                    variant={"solid"}
                    colorScheme="purple"
                    icon={<CopyIcon />}
                ></IconButton>
            </Flex>
            <Flex gap={4}>
                <Button size={"sm"} variant={"outline"} colorScheme="purple">
                    Upload
                </Button>
                <Button size={"sm"} variant={"outline"} colorScheme="purple">
                    Save
                </Button>
            </Flex>
        </Flex>
    );
};

export default UploadSaveSection;
