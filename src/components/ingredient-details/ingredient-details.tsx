import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { IngredientDetailsProps } from './type';

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  isModal = false
}) => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();

  const ingredients = useAppSelector(
    (state) => state.ingredientsFetch.ingredients
  );

  const loading = useAppSelector((state) => state.ingredientsFetch.loading);

  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

  if (!id || loading || !ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} isModal={isModal} />
  );
};
