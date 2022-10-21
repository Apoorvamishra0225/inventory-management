import React,{useState,useEffect} from 'react'
import CategoryService from './Services/CategoryService'
import ProductService from './Services/ProductService'
import { Link } from 'react-router-dom'
import AddProductComponent from './AddProductComponent'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ListProductComponent = () => {
    const Navigate=useNavigate()
    const [products, setProduct] = useState([])
    const[category,setCategory]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sorted, setSorted] = useState({ sorted: "price", reversed: false });
    const sortByPrice = () => {
		const productsCopy = [...products];
		productsCopy.sort((productA, productB) => {
			if (sorted.reversed) {
				return productA.price - productB.price;
			}
			return productB.price - productA.price;
		});
		setProduct(productsCopy);
		setSorted({ sorted: "price", reversed: !sorted.reversed });
	};
	const sortByProductName = () => {
		const productsCopy = [...products];
		productsCopy.sort((productA, productB) => {
			const productNameA = `${productA.name}`;
			const productNameB = `${productB.name}`;
			if (sorted.reversed) {
				return productNameB.localeCompare(productNameA);
			}
			return productNameA.localeCompare(productNameB);
		});
		setProduct(productsCopy);
		setSorted({ sorted: "productname", reversed: !sorted.reversed });
	};
	const renderArrow = () => {
		if (sorted.reversed) {
			return <FaArrowUp  />;
		}
		return <FaArrowDown />;
	};
    function getCategoryName(productcategoryid) {
      const arr = category.find((categorysingle) => {
        console.log(productcategoryid, categorysingle.id, "comp");
        return categorysingle.id == productcategoryid;
      });
      console.log(arr)
      return arr?.categoryName;
    }
    useEffect(() => {

        ProductService.getAllProducts().then((response)=>{
            setProduct(response.data)
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })

        CategoryService.getAllCategory().then((response)=>{
            setCategory(response.data);
        })
      
    }, [])
    const deleteProduct = (productId) => {
        axios.delete("http://localhost:8083/product/delete/"+productId).then((response)=>{
            setProduct(products.filter(product => product.id !== productId))
        }).catch(error =>{
            console.log(error);
        })
    }
    const logout=()=>{
    localStorage.removeItem('token')
    alert('Successfully Logout')
     }
  return (

    <div className='container'>
        <h2 className = "text-center"> Product Details </h2>
         <div className="search-container">
				<input
					type="text"
					placeholder="Search by ProductName"
					onChange={(e)=>{
					setSearchTerm(e.target.value)
					}}
				/>
			</div> 
        <Link to = "/add-product" className = "btn btn-primary mb-2" > Add Product </Link>
        <Link to = "/register" className = "btn btn-primary mb-2"  onClick={logout} style={{marginLeft:"10px"}}> Logout </Link>

        
        <table className="table table-bordered table-striped">
                <thead>
                    <th> Product Id </th>
                    <th onClick={sortByProductName}><span style={{ marginRight: 10 }}>Product Name</span>{sorted.sorted === "productname"
									? renderArrow()
									: null} </th>
                    <th> Image </th>
                    <th onClick={sortByPrice}><span style={{ marginRight: 10 }}> Price </span>{sorted.sorted == "price"
									? renderArrow()
									: null}</th>
                    <th> Description </th>
                    <th> Category </th>
                    <th>Actions</th>
                    
                </thead>
                <tbody>
                    {
                        products.filter((product)=>{
                            if(searchTerm=="")
                            {
                                return product
                            }
                            else if(product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            {
                                return product
                            }
                        }).map(
                            product =>
                            <tr key = {product.id}> 
                                <td> {product.id} </td>
                                <td> {product.name} </td>
                                <td><img className='banner' src={product.imageURL} alt={product.imageURL}/></td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{getCategoryName(product.categoryId)}</td>
                                <td>
                                <Link className="btn btn-info" to={`/edit-product/${product.id}`} >Update</Link>
                                <button className = "btn btn-danger" onClick = {() => deleteProduct(product.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                                
                                </tr>
                                
                                
                        )
                    }
                </tbody>
            </table>
        
    </div>
  )
}

export default ListProductComponent