import { Box, Flex, Link, Code } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
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
                    ⚡️
                    <Code
                        bg={"purple.500"}
                        color={"white"}
                        fontSize={"2xl"}
                        href="/"
                        fontWeight="bold"
                    >
                        Shareditor
                    </Code>
                </Box>
                <Box display={{ base: "none", sm: "flex" }}>
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
                        <Code bg={"purple.500"} color={"white"}>
                            Github
                        </Code>
                    </Link>
                    <Link
                        isExternal
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        href="https://github.com/Omkar-Jawalkar/real-time-text-editor"
                        color="white"
                    >
                        <Icon fontSize={"xl"} as={FaGithub} />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
