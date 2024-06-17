import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { socket } from "../src/socket";
import Footer from "./components/footer/Footer";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const App = () => {
    const toast = useToast();

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

        return () => {
            socket.off("connect", () => {});
        };
    }, []);

    return (
        <Box
            minH={"4xl"}
            flexDir={"column"}
            display={"flex"}
            position={"relative"}
        >
            <Navbar />
            <RouterProvider router={router} />
            <Footer />
        </Box>
    );
};

export default App;
