import './App.css';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';

//components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetails';
import Orders from './pages/Orders';
import AdminPage from './pages/AdminPage';

//styles
import './styles/layout.css';
import './styles/product.css';
import './styles/register.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

        <Routes>
          {/* protected routes */}
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
          <Route path="/productdetail/:productid" element={<ProtectedRoutes><ProductDetail /></ProtectedRoutes>} />
          <Route path="/orders" element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
          <Route path="/admin" element={<ProtectedRoutes><AdminPage /></ProtectedRoutes>} />

          {/* non protected routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </div>
    </BrowserRouter>
        
  );
}

export default App;

export const ProtectedRoutes = ({children}) => {
  if(localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to="/login"/>
  }
}
