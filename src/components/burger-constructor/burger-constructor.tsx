import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, hideOrderModal } from '../../services/slices/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useAppSelector((state) => state.constructorIngredients.bun);
  const ingredients = useAppSelector(
    (state) => state.constructorIngredients.ingredients
  );
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = useAppSelector((state) => state.order.orderRequest);

  const orderModalData = useAppSelector((state) => state.order.orderModalData);

  const onOrderClick = () => {
    if (!isAuthChecked) return;

    if (!user) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    if (!bun || orderRequest) return;
    const ingredientIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(hideOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
