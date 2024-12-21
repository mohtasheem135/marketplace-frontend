import React from 'react';

const Checkout = () => {
  const handleCheckout = () => {
    // Implement checkout logic here (e.g., submit order)
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
