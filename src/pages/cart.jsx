import { Container, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../component/itemsForCart";

const CartPage = () => {
  const cartSelector = useSelector((state) => {
    state.cart;
  });
  const userSelector = useSelector((state) => {
    state.user;
  });

  const dispatch = useDispatch();

  const renderCartItems = () => {
    return cartSelector.items.map((item, idx) => {});
  };

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
