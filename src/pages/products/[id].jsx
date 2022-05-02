import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { MdLocalShipping } from "react-icons/md";
import axiosInstance from "../../configs/api";

const ProductDetail = ({ productDetailData }) => {
  console.log(productDetailData);
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 6, md: 12 }}
      >
        <Stack>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={productDetailData?.image_url}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "500px", lg: "500px" }}
          />
        </Stack>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {productDetailData?.product_name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              mt={"1"}
            >
              Rp.{productDetailData?.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Stack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                stock: {productDetailData?.stock}
              </Text>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Description
              </Text>
              <Divider />
              <Text fontSize={"lg"}>{productDetailData?.description}</Text>
            </Stack>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const productId = context.query.id;
    const res = await axios.get(
      `http://localhost:2000/products/details/${productId}`
    );

    return {
      props: {
        productDetailData: res?.data?.result,
      },
    };
  } catch (err) {
    console.log(err.response.data);
    return {
      props: {
        productDetailData: null,
      },
    };
  }
};

export default ProductDetail;
