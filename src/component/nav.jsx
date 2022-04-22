import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";

const Nav = () => {
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({
      type: "USER_LOGOUT",
    });
    Cookies.remove("user_token");
  };
  return (
    <Box
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      zIndex="999"
      color="white"
      position="sticky"
      top="0"
      bgColor="black"
      p="15px"
      borderBottom="1px solid black"
    >
      <Text color="white" ml={10}>WELCOME {userSelector.username}</Text>
      <Flex>
        {userSelector.id ? 
        <Link href={"/cart"}>
            <Button mr={6}bgColor="white" color="black" borderRadius="20px">Cart</Button>
        </Link> : undefined}
      {userSelector.id ?  <Button bgColor="white" color="black" onClick={logOut} borderRadius="20px" mr={10}>
        Log Out
      </Button> 
      : 
      <Link href={"/login"}>
       <Button bgColor="white" color="black" borderRadius="20px" mr={10}>
        Log In
      </Button>
      </Link>
     }
      </Flex>
     
    </Box>
  );
};
export default Nav;
