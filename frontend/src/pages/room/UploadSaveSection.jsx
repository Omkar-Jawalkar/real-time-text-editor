import { Button, Flex, useToast, Code, Input, Tooltip } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { calcLength } from "framer-motion";

const UploadSaveSection = ({ editorRef }) => {
    const toast = useToast();
    const inputRef = useRef(false);
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

    const JSONToFile = (obj, filename) => {
        const blob = new Blob([JSON.stringify(obj, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSave = () => {
        if (editorRef.current) {
            let delta = editorRef.current.getEditor().getContents();
            JSONToFile(delta, `shareeditor-${roomId}`);
        }
    };

    const handleUpload = (e) => {
        console.log("UPLOADING");
        if (inputRef.current) {
            if (e.target.files.length > 0) {
                let editor = editorRef.current.getEditor();
                const fileReader = new FileReader();
                let file = e.target.files[0];

                fileReader.readAsText(file, "UTF-8");
                fileReader.onload = (e) => {
                    let obj = JSON.parse(e.target.result);

                    editor.setContents(obj, "user");
                };
            }
        }
    };

    return (
        <Flex py={2} justifyContent={"space-between"} alignItems={"center"}>
            <Flex
                justifyContent={"center"}
                gap={{ base: 1, sm: "2" }}
                alignItems={"center"}
            >
                <Code
                    as={"u"}
                    textUnderlineOffset={5}
                    color={"purple.500"}
                    bg={"purple.100"}
                    gap={2}
                    fontWeight={"bold"}
                    fontSize={{ base: "sm", sm: "md" }}
                >
                    Invitation Code
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
            <Flex gap={{ base: 2, sm: 4 }}>
                <Input
                    onClick={(event) => {
                        event.target.value = "";
                    }}
                    accept=".json"
                    onChange={handleUpload}
                    ref={inputRef}
                    visibility={"hidden"}
                    type="file"
                />
                <Button
                    onClick={() => {
                        inputRef.current.click();
                    }}
                    size={"sm"}
                    variant={"outline"}
                    colorScheme="purple"
                >
                    Upload
                </Button>
                <Button
                    onClick={handleSave}
                    size={"sm"}
                    variant={"outline"}
                    colorScheme="purple"
                >
                    Save
                </Button>
            </Flex>
        </Flex>
    );
};

UploadSaveSection.propTypes = {
    editorRef: PropTypes.any,
};

export default UploadSaveSection;
