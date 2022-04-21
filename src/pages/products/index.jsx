import { Box } from "@chakra-ui/react"
import { useState } from "react"
import ProductCard from "../../component/productCard"

const productPage = () => {
    const [productList, setProductList] = useState([])

    const fetchProduct = () => {

    }

    return(
        <Box>
            <ProductCard/>
        </Box>
    )
}

export default productPage