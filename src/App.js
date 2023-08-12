
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home/Home';
import { Department } from './Pages/Departments/Department';
import { Products } from './Pages/Products/Product';
import { SinglePage } from './Pages/SinglePage/SinglePage';

function App() {
    const navigate = useNavigate();
  return (
    <div className="App">
        <div className='leftNav'>
        <div>
        <div onClick={() => navigate("/")} className="navItems">
            Dashboard
        </div>
        <div onClick={() => navigate("/departments")} className="navItems">
            Departments
        </div>
        <div onClick={() => navigate("/products")} className="navItems">
            Products
        </div>
        
    </div>
        </div>
        <div className='main'>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/departments" element={<Department/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:productId" element={<SinglePage/>} />
      </Routes>
        </div>
      
     
    </div>
  );
}

export default App;
