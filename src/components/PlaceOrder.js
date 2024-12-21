import React, { useState } from "react";
import { Button } from "./ui/button";
import OrderService from "../service/orderService";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";

function PlaceOrder({ basket }) {
    const navigate = useNavigate();
    const { clearBasket } = useBasket(); 
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
        const response = await OrderService.placeOrder(userDetails, basket);
        console.log('Order placed successfully:', response);
        alert("Order placed successfully!!!")
        clearBasket()
        navigate("/orders-placed")
      } catch (error) {
        console.error('Error placing order:', error);
      }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        name="name"
        value={userDetails.name}
        onChange={handleChange}
        placeholder="Name"
        className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
      />
      <input
        type="email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
        placeholder="Email"
        className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
      />
      <textarea
        name="address"
        value={userDetails.address}
        onChange={handleChange}
        placeholder="Address"
        className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
      />
      <Button onClick={handlePlaceOrder}>Place Order</Button>
    </div>
  );
}

export default PlaceOrder;
