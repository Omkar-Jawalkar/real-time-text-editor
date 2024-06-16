import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Room from "../pages/room/Room";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/:roomId",
        element: <Room />,
    },
]);

export default router;
