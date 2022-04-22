import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { userLogin } from "../../redux/actions/user";
import Link from "next/link";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("This field is required!"),
      password: yup.string().required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 1500);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  console.log(userSelector);

  useEffect(() => {
    if (userSelector.id) {
      router.push("/cart");
    }
  });
  return (
    // <Center>
    <Flex>
      {/* LEFT SIDE COMPONENTS */}
      <Box display="flex" justifyContent="center">
        <Image
          src={
            "https://images.unsplash.com/photo-1650477733936-06fa48166e5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          width="700px"
          m={1}
        />
        <Flex flexDir="column" position="absolute" color="white" top={60}>
          <Text fontSize="5xl">New Here?</Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl">
              Sign up here so you won't miss out our great products!
            </Text>
            <Link href="/sign-up">
              <Button
                bgColor="white"
                w="100px"
                ml={3}
                color="black"
                borderRadius="20px"
                mt={4}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>

      {/* RIGHT SIDE COMPONENTS */}

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
        mt={10}
        top={40}
        right={60}
      >
        <Heading mt={3}>Login to Your Account</Heading>
        <Box width="100%" p={5}>
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
        <Flex mb={3}>
          <Button
            colorScheme="green"
            w="100px"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
          <Link href="/sign-up">
            <Button colorScheme="blue" w="100px" ml={3}>
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
    // </Center>
  );
};

export default LoginPage;
