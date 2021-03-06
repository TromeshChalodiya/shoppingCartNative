import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';

import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://shopping-cart-3d504-default-rtdb.firebaseio.com/products.json'
      );
      if (!response.ok) {
        throw new Error('Something went wwrong!');
      }

      const resData = await response.json();

      const loadedProduct = [];
      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProduct,
        userProducts: loadedProduct.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      // we can send data to analytics as well
      throw err;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    let pushToken;
    let statusObj = await Camera.requestPermissionsAsync(Camera.NOTIFICATIONS);
    if (statusObj.status !== 'granted') {
      statusObj = await Camera.askAsync(Camera.NOTIFICATIONS);
    }

    if (statusObj.status !== 'granted') {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shopping-cart-3d504-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
        ownerId: userId,
        pushToken: pushToken,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shopping-cart-3d504-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageUrl,
        description,
      },
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shopping-cart-3d504-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};
