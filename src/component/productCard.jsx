import {
  Box,
  Image,
  Text,
  Flex,
  Icon,
  Button,
  Link,
  useToast,
} from "@chakra-ui/react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../configs/api";

const ProductCard = ({ productName, image_url, price, productId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userSelector = useSelector((state) => {
    return state.user;
  });

  const addToCartBtnHandler = async () => {
    try {
      const productAddedToCart = {
        product_id: productId,
        user_id: userSelector.id,
      };
      await axiosInstance.post(`/cart`, productAddedToCart);

      dispatch(fetchUserCart());

      toast({
        title: "Item added to cart",
        duration: 2000,
        isClosable: true,
        status: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box padding="10px" width="200px" bg="white" shadow="md" margin="10px">
      <Link href={`products/${productId}`}>
        <Image
          borderRadius="10px"
          width="inherit"
          height="200px"
          objectFit="cover"
          mb="10px"
          src={image_url}
          fallbackSrc="http://placehold.jp/300x400.png"
        />
      </Link>
      <Text fontSize="18px" fontWeight="semibold">
        {productName}
      </Text>
      <Text my="10px">Rp. {price?.toLocaleString()}</Text>
      <Flex>
        <Button onClick={addToCartBtnHandler}>
          <Text>Add to Cart</Text>
          <Icon margin="5px" as={RiShoppingCart2Fill} />
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
