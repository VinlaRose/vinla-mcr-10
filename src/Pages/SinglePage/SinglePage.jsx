import { useParams } from "react-router-dom";
import "./SinglePage.css"
import { useContext } from "react";
import { DataContext } from "../../context/context";

export const SinglePage = () => {
    const {state} = useContext(DataContext)
    const {productId} = useParams();
  
    
    const required = state.filteredData.find(item => item.id == productId);
    console.log(required)
    return (
        <div className="singleProd">
            <img src={required?.imageUrl} alt={required?.name} className="product-big-image" />
            <h3>Name: {required?.name}</h3>
                    <h3>Desciption: {required?.description}</h3>
                     <h3>Price: ${required?.price}</h3>
                     <h3>Stock: {required?.stock}</h3>
                     <h3>Supplier: {required?.supplier}</h3>
                     <h3>Department: {required?.department}</h3>
        </div>
    )
}