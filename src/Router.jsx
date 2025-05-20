import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import SignIn from './pages/Auth/SignUp'
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<SignIn />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default Routing