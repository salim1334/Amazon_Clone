import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import Result from './pages/Result/Result'
import ProductDetail from './pages/ProductDetail/ProductDetail';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category/:categoryName' element={<Result />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default Routing