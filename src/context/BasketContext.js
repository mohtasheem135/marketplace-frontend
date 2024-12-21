import React, { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product, quantity) => {
    setBasket((prevBasket) => {
      const productIndex = prevBasket.findIndex((item) => item.product.id === product.id);
      
      if (productIndex === -1) {
        return [...prevBasket, { product, quantity }];
      } else {
        const updatedBasket = [...prevBasket];
        updatedBasket[productIndex].quantity += quantity;
        return updatedBasket;
      }
    });
  };

  const removeFromBasket = (productId) => {
    setBasket((prevBasket) => prevBasket.filter(item => item.product.id !== productId));
  };

  const clearBasket = () => {
    setBasket([]);  
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
