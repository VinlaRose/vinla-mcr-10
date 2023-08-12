
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <h1>MCR-11</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
