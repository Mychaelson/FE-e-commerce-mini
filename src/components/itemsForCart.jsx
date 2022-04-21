import {
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const CartItem = () => {
  return (
    <Grid templateColumns="repeat(7, 1fr)" my={4}>
      <GridItem w="100%" display="flex" alignItems="center">
        <Image
          objectFit="cover"
          boxSize="120px"
          borderRadius={8}
          fallbackSrc={"https://via.placeholder.com/120"}
        />
      </GridItem>
      <GridItem w="100%" colSpan={2} display="flex" alignItems="center">
        <Flex direction="column">
          <Text fontWeight="medium">Product</Text>
          <Text color="gray.600" fontSize="sm">
            Category
          </Text>
        </Flex>
      </GridItem>

      <GridItem w="100%" display="flex" alignItems="center">
        <Input h={12} w={24} textAlign="center" type="number" value={1} />
      </GridItem>
      <GridItem
        w="100%"
        colSpan={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="medium">Rp. 10.000</Text>
      </GridItem>
      <GridItem w="100%" display="flex" alignItems="center">
        <IconButton colorScheme="red" icon={<Icon as={IoMdClose} />} />
      </GridItem>
    </Grid>
  );
};

export default CartItem;
