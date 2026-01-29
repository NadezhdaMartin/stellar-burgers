import { FC, memo, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient } from '../../services/slices/constructorSlice';
import { useAppDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count, onClick, dataCy }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = (e: SyntheticEvent) => {
      e.stopPropagation();
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        dataCy={dataCy}
        onClick={onClick}
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
