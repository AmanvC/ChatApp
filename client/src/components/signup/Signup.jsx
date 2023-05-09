import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
} from "@chakra-ui/react";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadedPicture, setUploadedPicture] = useState(null);

  const isPasswordSame = inputs.password === inputs.confirmPassword;

  const handleChangeInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {};

  const handleSubmit = async () => {
    setSubmittingForm(true);
    console.log(inputs);
  };

  return (
    <VStack spacing="20px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChangeInput}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChangeInput}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChangeInput}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired isInvalid={!isPasswordSame}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChangeInput}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!isPasswordSame ? (
          <FormErrorMessage>Passwords should match!</FormErrorMessage>
        ) : null}
      </FormControl>
      <VStack w="100%" d="flex" alignItems="flex-start">
        <FormControl>
          <FormLabel textDecoration="underline" cursor="pointer">
            Upload picture
          </FormLabel>
          <Input
            type="file"
            p="1.5"
            display="none"
            accept="image/*"
            onClick={(e) => (e.target.value = null)}
            onChange={(e) => setUploadedPicture(e.target.files[0])}
          />
        </FormControl>
        {uploadedPicture && (
          <HStack>
            <Image
              borderRadius="full"
              boxSize="80px"
              objectFit="cover"
              src={URL.createObjectURL(uploadedPicture)}
            />
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => setUploadedPicture(null)}
            >
              Delete
            </Button>
          </HStack>
        )}
      </VStack>
      <Button
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 30 }}
        isLoading={submittingForm}
        loadingText="Signing Up"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
