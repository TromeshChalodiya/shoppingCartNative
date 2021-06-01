export const SIGN_UP = 'SIGN_UP';
export const LOGIN_IN = 'LOGIN_IN';

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3DMaiIwm9P30h6Au9WBs5Z6IeTOSiEaM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;

      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'The email address is already in use by another account!';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: SIGN_UP,
    });
  };
};

export const loginIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3DMaiIwm9P30h6Au9WBs5Z6IeTOSiEaM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;

      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'There is no user record corresponding to this email!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'The password is invalid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: LOGIN_IN,
    });
  };
};
