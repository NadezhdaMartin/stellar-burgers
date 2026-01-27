import  { getFeedOrders, initialState } from '../src/services/slices/feedSlice';
import feedReducer from '../src/services/slices/feedSlice';

const expectedResultFeedFetch = {
  "orders": [
    {
      "_id": "69774f9fa64177001b328b94",
      "ingredients": [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa093d"
      ],
      "status": "done",
      "name": "Био-марсианский space флюоресцентный бургер",
      "createdAt": "2026-01-26T11:27:27.924Z",
      "updatedAt": "2026-01-26T11:27:28.231Z",
      "number": 99632
    },
    {
      "_id": "69774f68a64177001b328b92",
      "ingredients": [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0947",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d"
      ],
      "status": "done",
      "name": "Фалленианский антарианский флюоресцентный люминесцентный бургер",
      "createdAt": "2026-01-26T11:26:32.007Z",
      "updatedAt": "2026-01-26T11:26:32.243Z",
      "number": 99631
    },
  ],
  "total": 20,
  "totalToday": 2
};

describe('feed reducer', () => {
  it('fulfilled: load feed', () => {
    const action = {
      type: getFeedOrders.fulfilled.type, 
      payload: {
        orders: expectedResultFeedFetch.orders,
        total: expectedResultFeedFetch.total,
        totalToday: expectedResultFeedFetch.totalToday
      }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: expectedResultFeedFetch.orders,
      total: expectedResultFeedFetch.total,
      totalToday: expectedResultFeedFetch.totalToday
    });
  });

  it('pending: sets loading to true', () => {
    const action = {type: getFeedOrders.pending.type};
    const state = feedReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: true});
  });

  it('rejected: sets error', () => {
    const action = {type: getFeedOrders.rejected.type, payload: "Error loading feed"};
    const state = feedReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: false, error: "Error loading feed"});
  });
});
