// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Button } from './components/ui/button';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [order, setOrder] = useState({ productId: '', quantity: 1 });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const { data } = await axios.get('http://localhost:5000/api/products');
//     setProducts(data);
//   };
//   const placeOrder = async () => {
//     await axios.post('http://localhost:5000/api/orders', order);
//     alert('Order placed successfully!');
//   };

//   return (
//     <div>
//       <h1>Marketplace</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.id} - {product.name} - ${product.price}
//             <Button className='border-2 border-black' variant="default" onClick={() => setOrder({ ...order, productId: product.id })}>
//               Buy Now
//             </Button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="number"
//         value={order.quantity}
//         onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
//         placeholder="Quantity"
//       />
//       <Button onClick={placeOrder}>Place Order</Button>
//     </div>
//   );
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";
import ProductForm from "./components/ProductForm";
import { BasketProvider } from "./context/BasketContext";
import OrdersPlaced from "./components/OrdersPlaced";

const App = () => {
  return (
    <BasketProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            {/* <Route path="/products" element={<ProductList />} /> */}
            <Route path="/basket" element={<Basket />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/orders-placed" element={<OrdersPlaced />} />
            <Route path="/edit-product/:id" element={<ProductForm />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </BasketProvider>
  );
};

export default App;
