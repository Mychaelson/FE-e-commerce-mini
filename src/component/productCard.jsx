import { Box, Img, Text, Flex, Icon, Button } from "@chakra-ui/react";
import { RiShoppingCart2Fill } from "react-icons/ri";

const ProductCard = ({productName, image_url, price}) => {
  return (
    <Box padding="10px" width="sm" bg="white" shadow="md">
      <Img
        borderRadius="10px"
        mb="10px"
        src={image_url}
      />
      <Text fontSize="20px" fontWeight="semibold">
        {productName}
      </Text>
      <Text my="10px">Rp. {price?.toLocaleString()}</Text>
      <Flex>
        <Button>
          <Text>Add to Cart</Text>
          <Icon margin="5px" as={RiShoppingCart2Fill} />
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
