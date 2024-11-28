import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, Image, Input, Tooltip } from "@chakra-ui/react";

export default function AvatarUploader({ imageUrl, onFieldChange, setFiles }) {
    const onDrop = useCallback((files) => {
        setFiles(files);
        onFieldChange(URL.createObjectURL(files[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    return (
        <Center {...getRootProps()}>
            <Input {...getInputProps()} id="avatar" cursor="pointer" />
            <Tooltip label="Change avatar">
                <Image
                    alt="profile"
                    rounded="full"
                    h="24"
                    w="24"
                    objectFit="cover"
                    cursor="pointer"
                    mt="2"
                    src={imageUrl}
                />
            </Tooltip>
        </Center>
    );
}
