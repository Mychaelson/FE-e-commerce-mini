import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormLabel,
  Icon,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../../component/productCard";
import axiosInstance from "../../lib/api";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useFormik } from "formik";

const productPage = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("")
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("");


  const maxPostPerPage = 4;

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/", {
        params: {
          product_name: searchValue,
          _limit: maxPostPerPage,
          _page: page,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });

      setProductList(res.data.result.rows);
      const productCount = res.data.result.count;
      setMaxPage(Math.ceil(productCount / maxPostPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  const searchInputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;

    setSortInput(value)
  };

  const searchButton = () => {
    setSearchValue(searchInput);
    setPage(1);
  };
  const sortButton = () => {
    if (sortInput == "Highest Price") {
      setSortBy("price");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("price");
      setSortDir("ASC");
    } else if (sortInput == "name_ASC") {
      setSortBy("price");
      setSortDir("ASC");
    } else if (sortInput == "name_DESC") {
      setSortBy("price");
      setSortDir("ASC");
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
  }, [page, searchValue, sortDir, sortBy]);

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
      <Flex margin="10px" justifyContent="center">
        <FormLabel htmlFor="search">
          Search Products:
          <Flex>
            <Input
              onChange={searchInputHandler}
              id="search"
              marginRight="10px"
            />
            <Button colorScheme="teal" onClick={searchButton}>
              OK
            </Button>
          </Flex>
        </FormLabel>
      </Flex>
      Sort by:
      <Flex>
        <Select onChange={sortInputHandler} placeholder="--select--">
          <option>Highest Price</option>
          <option>Lowest Price</option>
          <option value="name_ASC">A - Z</option>
          <option value="name_DESC">Z - A</option>
        </Select>
        <Button ml="10px" onClick={sortButton}>sort</Button>
      </Flex>
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
