import axios from "axios";
import AddProductComponent from "../AddProductComponent";
const CATEGORY_BASE_REST_API_URL="http://localhost:8083/category/"

class CategoryService{
    getAllCategory(){
        return axios.get(CATEGORY_BASE_REST_API_URL)
    }
}
export default new CategoryService();