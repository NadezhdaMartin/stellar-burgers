import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getFeedOrders } from '../../services/slices/feedSlice';

export const OrderInfo: FC<{ isModal?: boolean }> = ({ isModal = false }) => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) =>
    state.feed.orders.find((order) => order.number.toString() === number)
  );

  const ingredients: TIngredient[] = useAppSelector(
    (state) => state.ingredientsFetch.ingredients
  );

  // Загружаем ленту, если ещё не загружена
  useEffect(() => {
    if (!orderData) {
      dispatch(getFeedOrders());
    }
  }, [dispatch, number, orderData]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} isModal={isModal} />;
};
