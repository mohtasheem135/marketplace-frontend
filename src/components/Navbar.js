import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../context/BasketContext";

const Navbar = () => {
  const { basket } = useBasket();
  return (
    <nav className="bg-blue-400 h-[70px]">
      <ul className="flex justify-between space-x-4 items-center h-full px-[20px] md:px-[100px]">
        <div className="flex space-x-3">
          <li className="border-2 py-1 px-2 rounded-md shadow-md bg-blue-900 text-white hover:bg-gray-400 hover:text-black cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="border-2 py-1 px-2 rounded-md shadow-md bg-blue-900 text-white hover:bg-gray-400 hover:text-black cursor-pointer">
            <Link to="/add-product">Add Product</Link>
          </li>
          <li className="border-2 py-1 px-2 rounded-md shadow-md bg-blue-900 text-white hover:bg-gray-400 hover:text-black cursor-pointer">
            <Link to="/orders-placed">Orders Placed</Link>
          </li>
        </div>
        <div>
          <li>
            <Link to="/basket">
              <ShoppingCart />
            </Link>
          </li>
          <span className="absolute rounded-full bg-black text-white flex justify-center items-center w-5 h-5 text-[12px] top-3 right-[10px] md:right-[90px]">
            {basket.length}
          </span>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
