import { Flex } from "@chakra-ui/react";
import Editor from "./Editor";
import UploadSaveSection from "./UploadSaveSection";
import { useRef } from "react";

const EditorSection = () => {
    const editorRef = useRef(false);

    return (
        <Flex gap={4} paddingY={4} flex={5} flexDirection={"column"}>
            <UploadSaveSection editorRef={editorRef} />
            <Editor editorRef={editorRef} />
        </Flex>
    );
};

export default EditorSection;
