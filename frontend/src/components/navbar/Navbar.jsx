import { Box, Flex, Spacer, Link, Button, IconButton } from "@chakra-ui/react";
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
                        Shareditor 🤝
                    </Link>
                </Box>
                <Box>
                    <Link href="/" fontWeight="bold" color="white">
                        A Real Time Collaborative Text Editor
                    </Link>
                </Box>

                <Flex justifyContent={"center"} gap={1} alignItems={"center"}>
                    <Link href="/about" color="white">
                        Github
                    </Link>
                    <Link
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        href="/about"
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
