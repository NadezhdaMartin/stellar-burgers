import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { getIngredientsApi } from '@api';

export type TConstructorState = {
  ingredients: TConstructorIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TConstructorState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  (TIngredient & { id: string })[],
  void,
  { rejectValue: string }
>(`${INGREDIENTS_SLICE_NAME}/fetch`, async (_, { rejectWithValue }) => {
  try {
    const ingredients = await getIngredientsApi();
    return ingredients.map((ingredient) => ({
      ...ingredient,
      id: crypto.randomUUID() //т.к. из API возвращает без id
    }));
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

const constructorSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to load ingredients';
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients
  }
});

export default constructorSlice.reducer;
