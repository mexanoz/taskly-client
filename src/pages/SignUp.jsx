import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../util.js";
import { useUser } from "../context/UserContext.jsx";

export default function SignUp() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const { updateUser } = useUser();

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await resp.json();
            if (resp.status == 200) {
                updateUser(data);
                toast.success("Signed up successfully");
                navigate("/profile");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Box p="3" maxW="lg" mx="auto">
            <Heading
                as="h1"
                textAlign="center"
                fontSize="3xl"
                fontWeight="semibold"
                my="7"
            >
                Create an account
            </Heading>
            <form onSubmit={handleSubmit(submit)}>
                <Stack gap="4">
                    <FormControl isInvalid={errors.username}>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
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
                            placeholder="Email"
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
                            placeholder="Password"
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
                        Sign up
                    </Button>
                </Stack>
            </form>
            <Flex gap="2" ml="5">
                <Text>Already have an account?</Text>
                <Link to={"/signin"}>
                    <Text as="span" color="blue.400">
                        Войти
                    </Text>
                </Link>
            </Flex>
        </Box>
    );
}
