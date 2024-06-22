import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            minW={"6xl"}
            bg={"purple.500"}
            fontWeight={"bold"}
            color={"white"}
            w={"full"}
            py={4}
            spacing={4}
        >
            <Text>
                Made with ❤️ by{" "}
                <Link href="https://github.com/omkar-Jawalkar/" isExternal>
                    @Omkar
                </Link>
            </Text>
        </Flex>
    );
};

export default Footer;
