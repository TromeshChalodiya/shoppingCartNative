import Order from '../../models/order';

export const ORDER_NOW = 'ORDER_NOW';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shopping-cart-3d504-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Something went wwrong!');
      }

      const resData = await response.json();

      const loadedProduct = [];

      for (const key in resData) {
        loadedProduct.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedProduct,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const orderNow = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://shopping-cart-3d504-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ORDER_NOW,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });

    for (const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken;

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Order was placed!',
          body: cartItem.productTitle,
        }),
      });
    }
  };
};
