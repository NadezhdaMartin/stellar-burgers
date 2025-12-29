import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  useDispatch,
  useSelector
} from 'react-redux';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import userOrdersReducer from './slices/userOrdersSlice';

const store = configureStore({
  reducer: {
    constructorIngredients: constructorReducer,
    ingredientsFetch: ingredientsReducer,
    order: orderReducer,
    feed: feedReducer,
    user: userReducer,
    userOrders: userOrdersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
