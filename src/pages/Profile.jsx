import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Box,
    Heading,
    Center,
    Input,
    Stack,
    FormControl,
    Button,
    Link,
    Flex,
    Text,
    FormErrorMessage,
    useDisclosure,
} from "@chakra-ui/react";
import DeleteConfirmation from "../components/DeleteConfirmation";
import AvatarUploader from "../components/AvatarUploader.jsx";
import { useUser } from "../context/UserContext";
import { API_BASE_URL } from "../util.js";
import { useState } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const { user, updateUser } = useUser();

    const [files, setFiles] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            avatar: user.avatar,
            username: user.username,
            email: user.email,
        },
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/users/delete/${user._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (res.status === 200) {
                toast.success(data.message);
                updateUser(null);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting user: ", error);
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signout`, {
                credentials: "include",
            });
            const data = await res.json();
            toast.success(data.message);
            updateUser(null);
            navigate("/");
        } catch (error) {
            toast.error(error);
        }
    };

    const handleFileUpload = async (files) => {
        const formData = new FormData();
        formData.append("image", files[0]);
        try {
            const res = await fetch(`${API_BASE_URL}/image/upload`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const resp = await res.json();
            return resp.imageUrl;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const submit = async (values) => {
        try {
            if (files.length > 0) {
                const newUrl = await handleFileUpload(files);
                if (newUrl) {
                    values.avatar = newUrl;
                }
            }
            const res = await fetch(
                `${API_BASE_URL}/users/update/${user._id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const data = await res.json();
            if (res.status === 200) {
                resetField("password");
                updateUser(data);
                toast.success("Profile updated");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error updating profile: ", error);
        }
    };

    return (
        <Box p="3" maxW="lg" mx="auto">
            <DeleteConfirmation
                alertTitle="Delete profile"
                handleClick={handleDeleteUser}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Heading
                as="h1"
                fontSize="3xl"
                fontWeight="semibold"
                textAlign="center"
                my="7"
            >
                Your profile
            </Heading>
            <form onSubmit={handleSubmit(submit)}>
                <Stack gap="4">
                    <Center>
                        <Controller
                            name="avatar"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <AvatarUploader
                                    onFieldChange={field.onChange}
                                    imageUrl={field.value}
                                    setFiles={setFiles}
                                />
                            )}
                        />
                    </Center>
                    <FormControl isInvalid={errors.username}>
                        <Input
                            id="username"
                            type="text"
                            placeholder="username"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <Input
                            id="password"
                            type="password"
                            placeholder="New password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        colorScheme="blue"
                    >
                        Update profile
                    </Button>
                </Stack>
            </form>
            <Stack gap="4" mt="5">
                <Link
                    as={RouterLink}
                    to="/create-task"
                    p="2"
                    bg="green.500"
                    rounded="lg"
                    textAlign="center"
                    textColor="white"
                    fontWeight="semibold"
                    _hover={{ bg: "green.600" }}
                >
                    Create new task
                </Link>
                <Flex justify="space-between">
                    <Text
                        as="span"
                        color="red.600"
                        cursor="pointer"
                        onClick={onOpen}
                    >
                        Delete profile
                    </Text>
                    <Text
                        as="span"
                        color="red.600"
                        cursor="pointer"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </Text>
                </Flex>
                <Text textAlign="center">
                    <Link
                        as={RouterLink}
                        to="/tasks"
                        color="blue"
                        _hover={{ textDecor: "none" }}
                    >
                        Show tasks
                    </Link>
                </Text>
            </Stack>
        </Box>
    );
}
