import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </ChakraProvider>
);
