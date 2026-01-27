import  { createOrder, initialState } from '../src/services/slices/orderSlice';
import orderReducer from '../src/services/slices/orderSlice';

const orderData = {
  "_id": "643d69a5c3f7b9001cfa0945",
  "name": "Соус с шипами Антарианского плоскоходца",
  "type": "sauce",
  "proteins": 101,
  "fat": 99,
  "carbohydrates": 100,
  "calories": 100,
  "price": 88,
  "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
  "__v": 0
};

describe('order reducer', () => {
  it('fulfilled: sets orderModalData', () => {
    const action = {type: createOrder.fulfilled.type, payload: orderData};
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderModalData: orderData
    });
  });

  it('pending: sets orderRequest to true', () => {
    const action = {type: createOrder.pending.type};
    const state = orderReducer(initialState, action);
    expect(state).toEqual({...initialState, orderRequest: true});
  });

  it('rejected: sets orderError', () => {
    const action = {type: createOrder.rejected.type, payload: 'Ошибка при создании заказа'};
    const state = orderReducer(initialState, action);
    expect(state).toEqual({...initialState, orderRequest: false, orderError: 'Ошибка при создании заказа'});
  });
});
