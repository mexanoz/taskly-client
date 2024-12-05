import { Box, Heading } from "@chakra-ui/react";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
    return (
        <Box p="3" maxW="4xl" mx="auto">
            <Heading
                as="h1"
                fontSize="3xl"
                fontWeight="semibold"
                textAlign="center"
                my="7"
            >
                Create a new task
            </Heading>
            <TaskForm type="create" />
        </Box>
    );
}
