import axios from 'axios';

const API_URL = 'https://marketplace-backend-fsl9.onrender.com/api/products';

const productService = {
  // Fetch all products
  getProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;  // Return product data from the response
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;  // Rethrow error for handling elsewhere
    }
  },

  // Fetch a single product by ID
  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;  // Return product data from the response
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Add a new product
  addProduct: async (product) => {
    try {
      const response = await axios.post(API_URL, product);
      return response.data;  // Return the created product data
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update an existing product by ID
  updateProduct: async (id, updatedProduct) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      return response.data;  // Return updated product data
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product by ID (optional, if you need this functionality)
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;  // Return a success message or status
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

export default productService;
