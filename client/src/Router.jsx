import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import Result from './pages/Result/Result';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { CheckoutProvider, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

const stripePromise = loadStripe(
  'pk_test_51RTT59FYpObiTX7ObF37rlSFEu0bF5ROMb0aThcLqekDLb3qC2WyjfLCiqCbmbawcO80C7sBf6ASxMMa6AI9qD7v00lor40W5x'
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={'You must login first to pay'}
              redirect={'/payments'}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={'You must login first to see your orders'}
              redirect={'/orders'}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
