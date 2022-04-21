import { Box, Button, Center, Container, Flex, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../../component/productCard";
import axiosInstance from "../../lib/api";
import {GrFormNext, GrFormPrevious} from "react-icons/gr"

const productPage = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const maxPostPerPage = 4

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/", {
        params: {
          _limit: maxPostPerPage,
          _page: page,
        },
      });

      setProductList(res.data.result.rows);
      const productCount = res.data.result.count;
      setMaxPage(Math.ceil(productCount/maxPostPerPage));
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
  }, [page]);

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Container width={"container.xl"}>
      <Flex flexWrap="wrap" justifyContent="center">
        {renderProducts()}
      </Flex>
      <Box display="flex" justifyContent="space-between">
        <Button onClick={previousPage}>
          <Icon as={GrFormPrevious} />
        </Button>
        <Button onClick={nextPage}>
          <Icon as={GrFormNext} />
        </Button>
      </Box>
    </Container>
  );
};

export default productPage;
