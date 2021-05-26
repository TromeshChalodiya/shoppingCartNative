import { ORDER_NOW } from '../actions/order';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NOW:
      const actionData = action.orderData;
      const newOrder = new Order(
        new Date().toString(),
        actionData.items,
        actionData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
