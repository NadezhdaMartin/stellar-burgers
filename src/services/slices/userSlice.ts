import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from './sliceNames';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  `${USER_SLICE_NAME}/login`,
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);
      const { user, accessToken, refreshToken } = response;
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async (_, { dispatch }) => {
    try {
      await logoutApi();
    } finally {
      // Всегда очищаем клиентские данные
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(setUser(null));
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkAuth`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getUserApi();
      // fetchWithRefresh уже обновил токены, если нужно
      return response.user;
    } catch (error) {
      // Если даже после refresh ошибка — пользователь не авторизован
      dispatch(logout());
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  `${USER_SLICE_NAME}/register`,
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(registerData);
      const { user, accessToken, refreshToken } = response;
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUserData`,
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
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
        state.error = null;
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
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.isAuthChecked = true;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors;

export default userSlice.reducer;
