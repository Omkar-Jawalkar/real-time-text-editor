import { Button, Flex, useToast, Code, Tooltip } from "@chakra-ui/react";
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
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                <Code color={"purple.500"} bg={"white"} fontSize={"md"}>
                    Share Invitation code
                </Code>
                <Tooltip label="Copy to clipboard" fontSize="sm">
                    <CopyIcon
                        cursor={"pointer"}
                        onClick={copySharingLinkToClipboard}
                        fontWeight={"extrabold"}
                        fontSize={"2xl"}
                        color={"purple.500"}
                        bg={"white"}
                    />
                </Tooltip>
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
