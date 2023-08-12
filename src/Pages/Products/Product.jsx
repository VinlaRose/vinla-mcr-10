import { useContext } from "react"
import { DataContext } from "../../context/context";
import "./Product.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export const Products = () => {
    const {state, dispatch} = useContext(DataContext);
    console.log(state)
    const [selectedOption, setSelectedOption] = useState(state.selectedFilters || 'all');
    const [sortOption, setSortOption] = useState()


      
  
  const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedOption);
    
    dispatch({type: "SELECTED_FILTER", payload: selectedValue})
    
    const filtered = selectedValue === 'all' 
    ? state.data 
    : state.data.filter((product) => product.department === selectedValue);
    
    

      }
      
      const handleSorting = (event) => {
        const sortOption = event.target.value
        setSortOption(sortOption);
        console.log(sortOption);
        
        let sortedData = [...state.filteredData];
        switch (sortOption) {
          case 'name':
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'price':
            sortedData.sort((a, b) => a.price - b.price);
            break;
          case 'stock':
            sortedData.sort((a, b) => a.stock - b.stock);
            break;
          default:
            break;
        }
        
        console.log(sortedData);
        
        dispatch({type:"SORTING", payload: sortedData})
        
        
      }
      
      const [showLowStock, setShowLowStock] = useState(false);

      const toggleLowStock = () => {
        console.log("clicked");
        dispatch({type: "SELECTED_FILTER", payload: "all"})
        setShowLowStock(!showLowStock);
        console.log(showLowStock);
        
        const filteredData = !showLowStock ?  state.data.filter(item => item.stock <= 10) : state.data;
        
        dispatch({type: "LOW_STOCK_FILTER", payload: filteredData})
      };
      
      const [modal, setOpenModal] = useState(false)
      
      const [formData, setFormData] = useState({
        id: uuid(),
        department: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        sku: '',
        supplier: '',
        delivered: '',
        imageUrl: '',
      });
   const openModal = () =>{
    setOpenModal(true)
   }
   
   const closeModal = () => {
    setOpenModal(false)
   }
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        closeModal();
        
        dispatch({type: "UPDATE", payload: [...state.data, formData]})
      };
    
  
    return (
        <div className="productsContainer">
         
            
            <div className="allFilters">
            <h1>
                Products
            </h1>
            <div>
      <select className="filterInputOption" value={selectedOption} onChange={handleOptionChange}>
        <option value="all">All Departments</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Clothing">Clothing</option>
        <option value="Toys">Toys</option>
      </select>
    </div>
    
    <div className="lowStockButton">
    <label className="square-radio">
    <input
      type="checkbox"
      checked={showLowStock}
      onChange={() => toggleLowStock()}
    />
    <div>Low stock Items</div>
    
  </label>
    </div>
    
    <div>
      <select className="sortInput" value={sortOption} onChange={handleSorting}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
      </select>
    </div>
    
    <div >
        <button onClick={openModal}>New</button>
        {
            modal && 
            <div className="modal-overlay">
                <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              
              <label>
                Department:
                <select name="department" value={formData.department} onChange={handleInputChange}>
                  <option value="">Select Department</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Toys">Toys</option>
                </select>
              </label>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </label>
              <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleInputChange} />
              </label>
              <label>
                Price:
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
              </label>
              <label>
                Stock:
                <input type="text" name="stock" value={formData.stock} onChange={handleInputChange} />
              </label>
              <label>
                SKU:
                <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} />
              </label>
              <label>
                Supplier:
                <input type="text" name="supplier" value={formData.supplier} onChange={handleInputChange} />
              </label>
              <label>
                Delivered:
                <input type="text" name="delivered" value={formData.delivered} onChange={handleInputChange} />
              </label>
              <label>
                Image URL:
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
            </div>
        }
      
    </div>
            </div>
        
    
            {
               <table className="product-table">
               <thead>
                 <tr>
                   <th className="header-image">Image</th>
                   <th className="header-name">Name</th>
                   <th className="header-description">Description</th>
                   <th className="header-price">Price</th>
                   <th className="header-stock">Stock</th>
                   <th className="header-supplier">Supplier</th>
                 </tr>
               </thead>
               <tbody>
                 {state.filteredData.map((product) => (
                   <tr key={product.id}>
                     <td>
                       <img src={product.imageUrl} alt={product.name} className="product-image" />
                     </td>
                     <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                     <td>{product.description}</td>
                     <td>${product.price}</td>
                     <td>{product.stock}</td>
                     <td>{product.supplier}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
            }
        </div>
    )
}