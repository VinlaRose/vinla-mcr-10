import { useContext } from "react"
import "./Home.css"
import { DataContext } from "../../context/context"

export const Home = () => {
    
    const {state, dispatch} = useContext(DataContext);
    console.log(state);
    
    const stocks = state.filteredData.map(item => item.stock).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const delivered =  state.filteredData.map(item => item.delivered).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const lowStock = state.filteredData.filter(item => item.stock <= 10).length;
   
    return (
        
        <div>
            <div className="detailBox">
                <h1>{stocks}</h1>
                <h3>Total stocks</h3>
                
            </div>
            <div className="detailBox">
                <h1>{delivered}</h1>
                <h3>Total delivered</h3>
                
            </div>
            <div className="detailBox">
            <h1>{lowStock}</h1>
                <h3>Low stocks items</h3>
                
            </div>
        </div>
    )
}