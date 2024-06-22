import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useRecoilState } from "recoil";
import { socket } from "../src/socket";
import "./App.css";
import usersState from "./atom/UsersState";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import router from "./routes/Routes";

const App = () => {
    const toast = useToast();
    const [users, setUsers] = useRecoilState(usersState);

    const connectedToastMessage = () => {
        toast({
            title: "Connected to the Server",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    useEffect(() => {
        socket.on("connect", connectedToastMessage);

        socket.on("users-joins-or-leaves", (usersDataJoinedOrLeft) => {
            setUsers(usersDataJoinedOrLeft?.users);
        });

        return () => {
            socket.off("connect", () => {});
            socket.off("users-joins-or-leaves", () => {});
        };
    }, [socket]);

    return (
        <Box
            minH={"min-content"}
            width={"full"}
            flexDir={"column"}
            display={"flex"}
            position={"relative"}
        >
            <Navbar />
            <Flex marginX={"auto"} w="full" minH={"100vh"} maxW={"6xl"}>
                <RouterProvider router={router} />
            </Flex>
            <Footer />
        </Box>
    );
};

export default App;
