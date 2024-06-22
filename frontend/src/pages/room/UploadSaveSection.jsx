import { Button, Flex, useToast, Code, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const UploadSaveSection = () => {
    const toast = useToast();

    const copySharingLinkToClipboard = () => {
        let fullURL = window.location.href;
        navigator.clipboard.writeText(fullURL);
        toast({
            title: `Link copied`,
            position: "top",
            status: "success",
            isClosable: true,
        });
    };

    return (
        <Flex py={2} justifyContent={"space-between"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                <Code colorScheme="purple" fontSize={"lg"}>
                    Sharing Link
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
                <Button colorScheme="purple">Upload</Button>
                <Button colorScheme="purple">Save</Button>
            </Flex>
        </Flex>
    );
};

export default UploadSaveSection;
