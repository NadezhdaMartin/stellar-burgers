import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, onIngredientClick }, ref) => {
  /** TODO: взять переменную из стора */
  const bun = useAppSelector((state) => state.constructorIngredients.bun);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorIngredients.ingredients
  );

  const burgerConstructor = {
    bun,
    constructorIngredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, constructorIngredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      onIngredientClick={onIngredientClick}
    />
  );
});
