import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FEED_ORDERS_SLICE_NAME } from './sliceNames';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeedOrders = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>(`${FEED_ORDERS_SLICE_NAME}/getFeedOrders`, async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (err) {
    return rejectWithValue('Ошибка загрузки ленты заказов');
  }
});

type TFeedOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedOrders = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: FEED_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? 'Ошибка загрузки ленты заказов с сервера';
      });
  }
});

export default feedSlice.reducer;
