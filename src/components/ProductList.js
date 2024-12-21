import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CircleMinus, CirclePlus, FilePenLine } from "lucide-react";
import { Badge } from "./ui/badge";
import productService from "../service/productService";
import { useBasket } from "../context/BasketContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToBasket } = useBasket();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) - 1,
    }));
  };

  const handleAddToBasket = (productId, quantity) => {
    const product = products.find((prod) => prod.id === productId);
    if (product && quantity > 0) {
      addToBasket(product, quantity); // Add the product to the basket context
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 0, // Reset quantity after adding to basket
      }));
    }
  };

  if (!products.length) return <p>Loading...</p>;
  return (
    <div className="px-[20px] md:px-[100px] py-10">
      <div className="flex flex-wrap ">
        {products.map((product) => {
          const quantity = quantities[product.id] || 0;
          return (
            <div className="px-2 h-[420px]">
              <Card className="p-4 w-[250px] h-[400px]" key={product.id}>
                <div className="p-4 flex justify-center items-center shadow-md rounded-md">
                  <img
                    src={product?.imageUrl}
                    alt="iamge"
                    className="rounded-md "
                  />
                </div>
                <p className="my-2">{product.description}</p>
                <h3>{product.name}</h3>
                <Badge className="font-light mb-2 text-[16px]">
                  ${product.price}
                </Badge>
                <div className="flex items-center justify-between w-[130px]">
                  <button
                    onClick={() => handleDecrease(product.id)}
                    className={`${
                      quantity <= 0 ? "bg-gray-700" : "bg-blue-950"
                    } flex justify-center items-center px-2 py-2 rounded-md cursor-pointer`}
                    disabled={quantity <= 0}
                  >
                    <CircleMinus color="white" size={20} />
                  </button>
                  <span className="cursor-default border-2 border-gray-400 w-[50px] flex justify-center items-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(product.id)}
                    className="bg-blue-950 flex justify-center items-center px-2 py-2 rounded-md cursor-pointer"
                  >
                    <CirclePlus color="white" size={20} />
                  </button>
                </div>
                <div className="justify-between mt-4 flex">
                  <Button
                    className={`${quantity<=0 && "bg-gray-600 cursor-default font-light"}  `}
                    onClick={() => handleAddToBasket(product.id, quantity)}
                    
                  >
                    Add to Basket
                  </Button>
                  <button onClick={()=> navigate(`/edit-product/${product.id}`)}>
                    <FilePenLine />
                  </button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
