import { Container, Heading } from "@chakra-ui/react";
import { values } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../component/itemsForCart";
import { fetchUserCart } from "../redux/actions/cart";

const CartPage = () => {
  const cartSelector = useSelector((state) => {
    return state.cart;
  });
  const userSelector = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  // put in the navbar
  // fetch the cart directly after the user logged in
  useEffect(() => {
    if (userSelector.id) {
      dispatch(fetchUserCart());
    }
  }, [userSelector.id]);

  const renderCartItems = () => {
    return cartSelector?.items?.map((item, idx) => {
      return (
        <CartItem
          imageUrl={item?.Product?.image_url}
          productName={item?.Product?.product_name}
          price={item?.Product?.price}
          quantity={item?.quantity}
          id={item?.id}
          cartIndex={idx}
        />
      );
    });
  };

  return (
    <Container minW={"7xl"} paddingTop={12}>
      <Heading>
        Shopping Cart ({cartSelector?.items?.length}{" "}
        {cartSelector?.items?.length > 1 ? "items" : "item"})
      </Heading>
      {renderCartItems()}
    </Container>
  );
};

export default CartPage;
