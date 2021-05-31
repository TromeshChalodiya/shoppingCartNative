import axios from 'axios';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    // await axios
    //   .post(
    //     'https://shopping-cart-3d504-default-rtdb.firebaseio.com/product.json',
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         title,
    //         imageUrl,
    //         description,
    //         price,
    //       }),
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.json());
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const response = await fetch(
      'https://shopping-cart-3d504-default-rtdb.firebaseio.com/product.json',
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
        }),
      }
    );

    const resData = await response.json();
    console.log('====resData=====>', resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      imageUrl,
      description,
    },
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};
