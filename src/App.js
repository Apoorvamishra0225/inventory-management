
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListProductComponent from './Components/ListProductComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductComponent from './Components/AddProductComponent';
import UpdateProduct from './Components/UpdateProduct';
import Register from './Components/Register';
import Login from './Components/Login';
import PrivateRoutes from './Components/PrivateRoutes'

function App() {
  return (
    <div className="App">
     <Router>
        <HeaderComponent />
        <div className= "container">
          <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path = "/" element = {<ListProductComponent/>} />
              <Route path="/add-product"element={<AddProductComponent />} />
              <Route path="/edit-product/:id"  element={<UpdateProduct />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login  />} />
          </Routes>
          </div>
        <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
