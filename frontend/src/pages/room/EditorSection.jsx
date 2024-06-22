import { Flex } from "@chakra-ui/react";
import Editor from "./Editor";
import UploadSaveSection from "./UploadSaveSection";

const EditorSection = () => {
    return (
        <Flex gap={4} paddingY={4} flex={5} flexDirection={"column"}>
            <UploadSaveSection />
            <Editor />  
        </Flex>
    );
};

export default EditorSection;
