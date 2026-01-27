import  { fetchUserOrders, initialState } from '../src/services/slices/userOrdersSlice';
import userOrdersReducer from '../src/services/slices/userOrdersSlice';

const orders = [
  {
    "createdAt": "2025-12-29T06:24:18.433Z",
    "ingredients": [
      '643d69a5c3f7b9001cfa093d', 
      '643d69a5c3f7b9001cfa0940', 
      '643d69a5c3f7b9001cfa093d'
    ],
    "name": "Метеоритный флюоресцентный бургер",
    "number": 98106,
    "status": "done",
    "updatedAt": "2025-12-29T06:24:18.645Z",
    "_id": "69521e92a64177001b32562d",
  },
  {
    "createdAt": "2025-12-29T08:19:23.418Z",
    "ingredients": [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0949',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093c'
    ],
    "name": "Экзо-плантаго метеоритный астероидный краторный бургер",
    "number": 98146,
    "status": "done",
    "updatedAt": "2025-12-29T08:19:23.635Z",
    "_id": "6952398ba64177001b325670"
  }
];

describe('orders user reducer', () => {
  it('fulfilled: load orders', () => {
    const action = {type: fetchUserOrders.fulfilled.type, payload: orders};
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: orders
    });
  });

  it('pending: sets loading to true', () => {
    const action = {type: fetchUserOrders.pending.type};
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: true})
  });

  it('rejected: sets error', () => {
    const action = {type: fetchUserOrders.rejected.type, payload: 'Ошибка загрузки'};
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: false, error: 'Ошибка загрузки'})
  });
});
