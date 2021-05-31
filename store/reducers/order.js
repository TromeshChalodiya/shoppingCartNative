import { ORDER_NOW, SET_ORDERS } from '../actions/order';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ORDER_NOW:
      const actionData = action.orderData;
      const newOrder = new Order(
        actionData.id,
        actionData.items,
        actionData.amount,
        actionData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
