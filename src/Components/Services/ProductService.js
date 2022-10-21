import axios from "axios";
const PRODUCT_BASE_REST_API_URL="http://localhost:8083/product/"


class ProductService{
    getAllProducts(){
        return axios.get(PRODUCT_BASE_REST_API_URL)
    }

}

export default new ProductService();