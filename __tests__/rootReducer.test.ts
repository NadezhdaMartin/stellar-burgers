import { rootReducer } from '../src/services/store';
import { initialState as constructorInitialState } from '../src/services/slices/constructorSlice';
import { initialState as ingredientsInitialState } from '../src/services/slices/ingredientsSlice';
import { initialState as orderInitialState } from '../src/services/slices/orderSlice';
import { initialState as feedInitialState } from '../src/services/slices/feedSlice';
import { initialState as userInitialState } from '../src/services/slices/userSlice';
import { initialState as userOrdersInitialState } from '../src/services/slices/userOrdersSlice';

//проверка вызова rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером { type: 'UNKNOWN_ACTION' }
describe('rootReducer', () => {
  it('should return the correct initial state when called with undefined and an unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      constructorIngredients: constructorInitialState,
      ingredientsFetch: ingredientsInitialState,
      order: orderInitialState,
      feed: feedInitialState,
      user: userInitialState,
      userOrders: userOrdersInitialState
    });
  });
});
