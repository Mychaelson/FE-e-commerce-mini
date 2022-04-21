import { Container, Heading } from "@chakra-ui/react";
import CartItem from "../components/itemsForCart";

const CartPage = () => {
  return (
    <Container minW={"7xl"} paddingTop={12}>
      <Heading>Shopping Cart (3 items)</Heading>
      <CartItem />
      <CartItem />
      <CartItem />
    </Container>
  );
};

export default CartPage;
