import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams,useNavigate } from "react-router-dom";
import CategoryService from "./Services/CategoryService";


const AddProductComponent = () => {
const Navigate=useNavigate()
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryService.getAllCategory().then((response) => {
      setCategories(response.data);
      console.log(response.data)
      if(response.data.length > 0){
        setCategory(response.data[0].id)
      }
    });
  }, []);

  const addProduct = (e) => {
    e.preventDefault()
    const data = {
      name,
      description,
      imageURL: imageUrl,
      price:+price,
      categoryId: +category,
      id:5
    };
    console.log(category)
    axios.post("http://localhost:8083/product/add",data).then((response)=>{
    Navigate("/")
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Name :</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Image :</label>
                  <input
                    type="text"
                    placeholder="Enter imageURL"
                    name="image"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> description :</label>
                  <textarea
                    type="text"
                    placeholder="Enter Description"
                    name="Description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Category: </label>

                  <select onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((category) => (
                      <option
                        className="form-control"
                        value={category.id}
                        key={category.id}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Price :</label>
                  <input
                    type="number"
                    placeholder="Enter product Price"
                    name="Price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>
                <button className="btn btn-success" onClick={addProduct}>
                  Submit{" "}
                </button>
                <Link to="/" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductComponent;
