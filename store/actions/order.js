export const ORDER_NOW = 'ORDER_NOW';

export const orderNow = (cartItems, totalAmount) => {
  return {
    type: ORDER_NOW,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  };
};
