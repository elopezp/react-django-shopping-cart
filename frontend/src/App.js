import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./components/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from './components/product/ProductList'
import Cart from './components/cart/Cart'
import OrderList from './components/order/OrderList'
import OrderDetail from './components/order/OrderDetail'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3 d-flex flex-column min-vh-100">
        <Container>
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/products" element={<ProductList/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<OrderList/>} />
            <Route path='/order/:id' element={<OrderDetail/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
