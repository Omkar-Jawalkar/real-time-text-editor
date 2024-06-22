import { Box, Flex, Link, Code } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const Navbar = () => {
    return (
        <Box bg="purple.500" px={4}>
            <Flex
                h={16}
                marginX={"auto"}
                maxW={"6xl"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box>
                    <Link href="/" fontWeight="bold" color="white">
                        Shareditor 🚀
                    </Link>
                </Box>
                <Box>
                    <Link href="/" fontWeight="bold" color="white">
                        <Code colorScheme="purple">
                            ⚡️ A Real Time Collaborative Text Editor ⚡️
                        </Code>
                    </Link>
                </Box>

                <Flex
                    as={"u"}
                    justifyContent={"center"}
                    gap={1}
                    color={"white"}
                    alignItems={"center"}
                >
                    <Link
                        isExternal
                        fontWeight={"bold"}
                        textUnderlineOffset={true}
                        href="https://github.com/Omkar-Jawalkar/real-time-text-editor"
                        color="white"
                    >
                        Github
                    </Link>
                    <Link
                        isExternal
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        href="https://github.com/Omkar-Jawalkar/real-time-text-editor"
                        color="white"
                    >
                        <ExternalLinkIcon />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
