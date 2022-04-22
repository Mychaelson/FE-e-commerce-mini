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
import { useRouter } from "next/router";

const productPage = () => {
  const router = useRouter();

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
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
    setSortInput(value);
  }


  const searchButton = () => {
    setSearchValue(searchInput);
    setPage(1);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.product_name) {
        setSearchValue(router.query.product_name);
      }
      if (router.query._sortDir) {
        setSearchValue(router.query._sortDir);
      }
      if (router.query._sortBy) {
        setSearchValue(router.query._sortBy);
      }
    }
  }, [router.isReady]);

  const sortButton = () => {
    if (sortInput == "Highest Price") {
      setSortBy("price");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("price");
      setSortDir("ASC");
    } else if (sortInput == "name_ASC") {
      setSortBy("product_name");
      setSortDir("ASC");
    } else if (sortInput == "name_DESC") {
      setSortBy("product_name");
      setSortDir("DESC");
    } else if (sortInput == "") {
      setSortBy("");
      setSortDir("");
    }
  };

  const renderProducts = () => {
    return productList.map((val) => {
      return (
        <ProductCard
          image_url={val.image_url}
          productName={val.product_name}
          price={val.price}
          productId={val.id}
        />
      );
    });
  };

  useEffect(() => {
    console.log("test fetch");
    fetchProduct();

    if (searchValue) {
      router.push({
        query: {
          product_name: searchValue,
        },
      });
    }

    if (sortInput) {
      router.push({
        query: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });
    }
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
        <form>
          <FormLabel htmlFor="search">
            Search Products:
            <Flex>
              <Input
                onChange={searchInputHandler}
                id="search"
                marginRight="10px"
              />
              <Button type="submit" colorScheme="teal" onClick={searchButton}>
                OK
              </Button>
            </Flex>
          </FormLabel>
        </form>
      </Flex>
      Sort by:
      <Flex margin="10px">
        <Select onChange={sortInputHandler} placeholder="--select--">
          <option>Highest Price</option>
          <option>Lowest Price</option>
          <option value="name_ASC">A - Z</option>
          <option value="name_DESC">Z - A</option>
        </Select>
        <Button ml="10px" onClick={sortButton}>
          sort
        </Button>
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
