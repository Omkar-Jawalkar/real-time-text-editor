import {
    Text,
    Flex,
    Input,
    Link,
    Button,
    Heading,
    Divider,
} from "@chakra-ui/react";
const Home = () => {
    return (
        <Flex
            margin={"auto"}
            my={"2xl"}
            padding={4}
            gap={4}
            border={"1px"}
            borderRadius={"md"}
            borderColor={"gray"}
            flexDirection={"column"}
            minW={"xl"}
        >
            <Heading textAlign={"center"} size={"md"}>
                Welcome to Shareditor
            </Heading>
            <Input variant="filled" placeholder="Room Id"></Input>
            <Input variant="filled" placeholder="Username"></Input>
            <Button variant={"outline"}>Join</Button>
            <Divider paddingY={2} />
            <Text textAlign={"center"}>
                Dont have a Room Id? <Link color={"teal"}> Create one </Link>{" "}
                and join :)
            </Text>
        </Flex>
    );
};

export default Home;
