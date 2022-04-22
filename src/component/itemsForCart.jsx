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
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import axiosInstance from "../configs/api";
import * as Yup from "yup";

const CartItem = ({
  imageUrl,
  productName,
  price,
  quantity,
  id,
  cartIndex,
}) => {
  const dispatch = useDispatch();

  const deleteItemCart = () => {
    try {
      axiosInstance.delete(`/cart/${id}`);
      dispatch({
        type: "DELETE_ITEM",
        payload: cartIndex,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const debounceQtyInputHandler = useCallback(
    _.debounce(async (value) => {
      await axiosInstance.patch(`/cart/${id}`, {
        quantity: value,
      });

      console.log(value);

      dispatch({
        type: "EDIT_QTY",
        payload: {
          idx: cartIndex,
          quantity: value,
        },
      });
    }, 1500),
    []
  );

  const qntyInputHandler = (event) => {
    const { value } = event.target;

    if (value === "") {
      formik.setFieldValue("quantity", value);
      return;
    }

    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) return;

    if (parsedValue < 0) return;

    // if (parsedValue > stock) return;

    try {
      debounceQtyInputHandler(parsedValue);
      formik.setFieldValue("quantity", parsedValue);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      quantity: quantity,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1),
    }),
  });

  return (
    <Grid templateColumns="repeat(7, 1fr)" my={4}>
      <GridItem w="100%" display="flex" alignItems="center">
        <Image
          objectFit="cover"
          boxSize="120px"
          borderRadius={8}
          src={imageUrl}
          fallbackSrc={"https://via.placeholder.com/120"}
        />
      </GridItem>
      <GridItem w="100%" colSpan={2} display="flex" alignItems="center">
        <Flex direction="column">
          <Text fontWeight="medium">{productName || "product"}</Text>
        </Flex>
      </GridItem>

      <GridItem w="100%" display="flex" alignItems="center">
        <Input
          h={12}
          w={24}
          textAlign="center"
          type="number"
          value={formik.values.quantity}
          onChange={qntyInputHandler}
        />
      </GridItem>
      <GridItem
        w="100%"
        colSpan={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="medium">
          Rp. {(price * quantity).toLocaleString()}
        </Text>
      </GridItem>
      <GridItem w="100%" display="flex" alignItems="center">
        <IconButton
          onClick={deleteItemCart}
          colorScheme="red"
          icon={<Icon as={IoMdClose} />}
        />
      </GridItem>
    </Grid>
  );
};

export default CartItem;
