import  { login, register, initialState, updateUserData, checkUserAuth, logout } from '../src/services/slices/userSlice';
import userReducer from '../src/services/slices/userSlice';

const userData = {
  "success": true,
  "user": {
    "name": "Ivan Ivanov",
    "email": "ivanov@example.com"
  }
}

describe('user reducer', () => {
  it('fulfilled: get login user', () => {
    const action = {type: login.fulfilled.type, payload: userData};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userData.user,
      isAuthChecked: true,
    });
  });
  
  it('rejected: sets error login', () => {
    const action = {type: login.rejected.type, payload: 'Unknown error'};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Unknown error'
    })
  });

  it('fulfilled: register user', () => {
    const action = {type: register.fulfilled.type, payload: userData};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userData.user,
      isAuthChecked: true,
    });
  });
  
  it('rejected: sets error register', () => {
    const action = {type: register.rejected.type, payload: 'Ошибка регистрации'};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка регистрации'
    })
  });

  it('fulfilled: update user', () => {
    const action = {type: updateUserData.fulfilled.type, payload: userData};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userData.user,
      error: null
    });
  });

  it('fulfilled: check user auth', () => {
    const action = {type: checkUserAuth.fulfilled.type, payload: userData.user};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userData.user,
      isAuthChecked: true
    });
  });
  
  it('rejected: check user auth error', () => {
    const action = {type: checkUserAuth.rejected.type};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true
    })
  });

    it('fulfilled: logout user', () => {
    const action = {type: logout.fulfilled.type};
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      error: null,
      isAuthChecked: true
    });
  });
});
