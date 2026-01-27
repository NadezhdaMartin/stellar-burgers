import { fetchIngredients, initialState } from '../src/services/slices/ingredientsSlice';
import ingredientsReducer from '../src/services/slices/ingredientsSlice';

const expectedResultIngredientsFetch = [
    {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    }
];

describe('ingredient reducer', () => {
  it('fulfilled: load ingredients', () => {
    const action = {type: fetchIngredients.fulfilled.type, payload: [expectedResultIngredientsFetch]};
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({...initialState, ingredients: [expectedResultIngredientsFetch]})
  });

  it('pending: sets loading to true', () => {
    const action = {type: fetchIngredients.pending.type};
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: true})
  });
  
  it('rejected: sets error', () => {
    const action = {type: fetchIngredients.rejected.type, payload: "Error loading ingredients"};
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({...initialState, loading: false, error: "Error loading ingredients"})
  });
});


