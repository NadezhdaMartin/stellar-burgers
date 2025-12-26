import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from './sliceNames';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';

export const login = createAsyncThunk(
  `${USER_SLICE_NAME}/login`,
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async (_, { dispatch }) => {
    await logoutApi();
    dispatch(setUser(null));
  }
);

const isTokenExists = () => localStorage.getItem('accessToken') !== null;

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkAuth`,
  async (_, { dispatch }) => {
    if (!isTokenExists()) {
      dispatch(setIsAuthChecked(true));
      return null;
    }

    try {
      const response = await getUserApi();
      dispatch(setUser(response.user));
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch(setUser(null));
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const register = createAsyncThunk(
  `${USER_SLICE_NAME}/register`,
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(registerData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Unknown error';
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Ошибка регистрации';
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors;

export default userSlice.reducer;
