import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from "../../configs/api";
import Link from "next/link";
import Router from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please use a valid email")
        .required("This field is required!"),
      username: yup.string().required("This field is required!"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must contain atleast one uppercase alphabet, number, and special character!"
        )
        .required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        username: values.username,
        password: values.password,
      };

      await axiosInstance.post(`user/register`, newUser);
      formik.setSubmitting(false);
      Router.push("/login");
      toast({
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            <Text bg="green.500">Successfully created new account!</Text>
            An email has been sent to your mail, please click the link to verify
            your account. <Icon bg="green.500" as={BsFillCheckCircleFill} />
          </Box>
        ),
      });
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Flex mt={10}>
      <Image
        src="https://thumbs.dreamstime.com/b/trendy-beautiful-young-asian-woman-carrying-colorful-bags-shopping-online-mobile-phone-isolated-purple-banner-background-184325828.jpg"
        position="relative"
        height="550px"
        width="2500px"
      />
      <Box
        border="1px solid black"
        borderRadius="5px"
        w="450px"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        ml={4}
        position="absolute"
        bg="white"
        right={80}
        top={19}
      >
        <Heading p={5}>Create Your Account and Start Shopping!</Heading>
        <Box width="100%" p={7}>
          {/* EMAIL INPUT */}
          <FormControl isInvalid={formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input id="inputEmail" name="email" onChange={inputHandler} />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>

          {/* USERNAME INPUT */}
          <FormControl isInvalid={formik.errors.username}>
            <FormLabel>Username</FormLabel>
            <Input id="inputUsername" name="username" onChange={inputHandler} />
            <FormHelperText>{formik.errors.username}</FormHelperText>
          </FormControl>

          {/* PASSWORD INPUT */}
          <FormControl isInvalid={formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input id="inputPassword" name="password" onChange={inputHandler} />
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
        </Box>
        <Button
          mb={5}
          colorScheme="blue"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
