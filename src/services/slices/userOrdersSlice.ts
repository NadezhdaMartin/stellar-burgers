import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { USER_ORDERS_SLICE_NAME } from './sliceNames';
import { getOrdersApi } from '@api';

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>(
  `${USER_ORDERS_SLICE_NAME}/fetchUserOrders`,
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue('Заказы загрузить не удалось');
    }
  }
);

type TUserOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: USER_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      });
  }
});

export default userOrdersSlice.reducer;
