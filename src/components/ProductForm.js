import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../service/productService";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await productService.getProduct(id);
          setProduct(data); // Set the form fields with fetched data
        } catch (error) {
          console.error("Error fetching product for editing:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedProduct = {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
        }
        await productService.updateProduct(id, updatedProduct);
        alert("Product updated")
      } else {
        await productService.addProduct(product);
        alert("Product added")
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting product form:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await productService.deleteProduct(id);
      alert("Deleted Successfully")
      navigate("/")
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="px-[20px] md:px-[100px] py-10">
      <Card className="px-[20px] md:px-[100px] py-10">
        <CardHeader>
          <CardTitle className="text-[25px]">
            {id ? "Edit Product" : "Add Product"}
          </CardTitle>
        </CardHeader>
        {id && (
          <div className="absolute right-[30px] top-[120px] md:right-[110px] ">
            <Button onClick={handleDelete} className="bg-red-500">
              Delete Producr <Trash2 />
            </Button>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <div className="flex flex-col ">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
            />
          </div>

          <div className="flex flex-col ">
            <label>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
            />
          </div>

          <div className="flex flex-col ">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
            />
          </div>

          <div className="flex flex-col ">
            <label>Image URL:</label>
            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              required
              className="border-2 border-gray-500 outline-none py-1 px-2 w-[300px] rounded-md"
            />
          </div>

          <Button className="font-light" type="submit">
            {id ? "Update" : "Add"} Product
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
