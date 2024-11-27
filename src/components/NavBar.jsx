import {
    Box,
    Flex,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { API_BASE_URL } from "../util.js";

export default function NavBar() {
    const { user, updateUser } = useUser();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signout`, {
                credentials: "include",
            });
            const { message } = await res.json();
            toast.success(message);
            updateUser(null);
            navigate("/");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <Box as="nav" bg="red.50">
            <Flex
                minWidth="max-content"
                alignItems="center"
                padding="12px"
                maxWidth="7xl"
                margin="0 auto"
            >
                <Box padding="2">
                    <Link
                        as={RouterLink}
                        fontSize="lg"
                        fontWeight="bold"
                        to="/"
                    >
                        Taskly
                    </Link>
                </Box>
                <Spacer />
                <Box>
                    {user ? (
                        <Menu>
                            <MenuButton>
                                <Image
                                    boxSize="40px"
                                    borderRadius="full"
                                    src={user.avatar}
                                    alt={user.username}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={RouterLink} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem as={RouterLink} to="/tasks">
                                    Tasks
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                    Sign out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Link as={RouterLink} to="/signin">
                            Sign in
                        </Link>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}
