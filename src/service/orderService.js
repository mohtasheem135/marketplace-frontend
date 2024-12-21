import axios from 'axios';

const API_URL = "https://marketplace-backend-fsl9.onrender.com/api/orders";

const OrderService = {
  // Fetch all orders
  getOrders: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Return the fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Throw the error for further handling
    }
  },

  // Place a new order
  placeOrder: async (userDetails, basket) => {
    try {
      const response = await axios.post(API_URL, { userDetails, basket });
      return response.data; // Return the newly created order
    } catch (error) {
      console.error('Error placing order:', error);
      throw error; // Throw the error for further handling
    }
  },
};

export default OrderService;
