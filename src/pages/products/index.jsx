import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../../component/productCard";
import axiosInstance from "../../lib/api";

const productPage = () => {
  const [productList, setProductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/");

      setProductList(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProducts = () => {
    return productList.map((val) => {
      return (
        <ProductCard
          image_url={val.image_url}
          productName={val.product_name}
          price={val.price}
        />
      );
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return <Flex flexWrap="wrap">{renderProducts()}</Flex>;
};

export default productPage;
