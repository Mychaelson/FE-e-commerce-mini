import { Box, Image, Text, Flex, Icon, Button } from "@chakra-ui/react";
import { RiShoppingCart2Fill } from "react-icons/ri";

const ProductCard = ({productName, image_url, price}) => {
  return (
    <Box padding="10px" width="200px" bg="white" shadow="md" margin="10px">
      <Image
        borderRadius="10px"
        width="inherit"
        height="200px"
        objectFit="cover"
        mb="10px"
        src={image_url}
        fallbackSrc="http://placehold.jp/300x400.png"
      />
      <Text fontSize="18px" fontWeight="semibold">
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
