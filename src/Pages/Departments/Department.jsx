import { useContext } from "react"
import { DataContext } from "../../context/context"
import { useNavigate } from "react-router-dom";

export const Department = () => {
    const {state, dispatch} = useContext(DataContext);
    console.log(state);
    const navigate = useNavigate()
    
    const selectFilter = (dep) => {
        dispatch({type: "SELECTED_FILTER", payload: dep});
        navigate("/products")
    }
    
    return (
        <div className="detailsContainer">
            <div onClick={() => selectFilter("Kitchen")} className="detailBox">
                <h1>Kitchen</h1>
                
            </div ><div onClick={() => selectFilter("Clothing")} className="detailBox">
                <h1>Clothing</h1>
                
            </div><div onClick={() => selectFilter("Toys")} className="detailBox">
                <h1>Toys</h1>
                
            </div>
        </div>
    )
}