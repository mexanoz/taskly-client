import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <UserProvider>
            <ChakraProvider>
                <BrowserRouter>
                    <Toaster position="bottom-right"></Toaster>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </UserProvider>
    );
}
