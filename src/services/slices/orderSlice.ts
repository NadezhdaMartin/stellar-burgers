import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from './sliceNames';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      return data.order;
    } catch (err) {
      return rejectWithValue('Ошибка при создании заказа');
    }
  }
);

type TCreateOrder = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: null | string;
};

export const initialState: TCreateOrder = {
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    hideOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      });
  }
});

export const { hideOrderModal } = orderSlice.actions;

export default orderSlice.reducer;
