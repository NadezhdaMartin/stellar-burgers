import { clear } from 'console';
import { addIngredient, clearConstructor, initialState, moveIngredientDown, moveIngredientUp, removeIngredient, TConstructorState } from '../src/services/slices/constructorSlice';
import constructorReducer from '../src/services/slices/constructorSlice';

const bun = {
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
};

const mainСrystal = {
  "_id": "643d69a5c3f7b9001cfa0948",
  "name": "Кристаллы марсианских альфа-сахаридов",
  "type": "main",
  "proteins": 234,
  "fat": 432,
  "carbohydrates": 111,
  "calories": 189,
  "price": 762,
  "image": "https://code.s3.yandex.net/react/code/core.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
  "__v": 0
};

const mainSauce = {
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

const mainSteak = {
  "_id": "643d69a5c3f7b9001cfa0940",
  "name": "Говяжий метеорит (отбивная)",
  "type": "main",
  "proteins": 800,
  "fat": 800,
  "carbohydrates": 300,
  "calories": 2674,
  "price": 3000,
  "image": "https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v": 0
}

describe('constructorSlice', () => {
  test('addIngredient', () => {
    let newState = constructorReducer(initialState, addIngredient(bun));
    newState = constructorReducer(newState, addIngredient(mainСrystal));

    //objectContaining - игнорируем id и другие возможные поля, т.к. используем prepare в addIngredient
    expect(newState.bun).toEqual(expect.objectContaining(bun));
    expect(newState.ingredients[0]).toEqual(expect.objectContaining(mainСrystal));
  });

  test('removeIngredient', () => {
    const initialStateForRemove: TConstructorState = {
      ingredients: [
        {...mainСrystal, "id": "crystal-id"},
        {...mainSauce, "id": "sauce-id"}
      ],
      bun: null
    };

    let newState = constructorReducer(initialStateForRemove, removeIngredient("sauce-id"));

    expect(newState).toEqual({
      ingredients: [
        {...mainСrystal, "id": "crystal-id"},
      ],
      bun: null
    });
  });

  test('moveIngredientUp', () => {
    const initialStateForMoveIngredientUp: TConstructorState = {
      ingredients: [
        {...mainСrystal, "id": "crystal-id"},
        {...mainSauce, "id": "sauce-id"},
        {...mainSteak, "id": "steak-id"}
      ],
      bun: null
    };

    let newState = constructorReducer(initialStateForMoveIngredientUp, moveIngredientUp("steak-id"));

    expect(newState).toEqual({
      ingredients: [
        {...mainСrystal, "id": "crystal-id"},
        {...mainSteak, "id": "steak-id"},
        {...mainSauce, "id": "sauce-id"}
      ],
      bun: null
    });
  });

  test('moveIngredientDown', () => {
    const initialStateForMoveIngredientDown: TConstructorState = {
      ingredients: [
        {...mainСrystal, "id": "crystal-id"},
        {...mainSauce, "id": "sauce-id"},
        {...mainSteak, "id": "steak-id"}
      ],
      bun: null
    };

    let newState = constructorReducer(initialStateForMoveIngredientDown, moveIngredientDown("crystal-id"));

    expect(newState).toEqual({
      ingredients: [
        {...mainSauce, "id": "sauce-id"},
        {...mainСrystal, "id": "crystal-id"},
        {...mainSteak, "id": "steak-id"}
      ],
      bun: null
    });
  });

  test('clear constructor', () => {
    let newState = constructorReducer(initialState, clearConstructor());
    expect(newState).toEqual(initialState);
  });
});







