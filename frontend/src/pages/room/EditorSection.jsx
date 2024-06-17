import { Flex } from "@chakra-ui/react";
import Editor from "./Editor";
import UploadSaveSection from "./UploadSaveSection";

const EditorSection = () => {
    return (
        <Flex gap={4} padding={4} flex={3} flexDirection={"column"}>
            <UploadSaveSection />
            <Editor />
        </Flex>
    );
};

export default EditorSection;
