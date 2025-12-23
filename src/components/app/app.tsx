import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  BurgerIngredient,
  IngredientDetails,
  Modal
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { BurgerIngredientUI, Preloader } from '@ui';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isIngredientsLoading = useAppSelector(
    (state: RootState) => state.ingredientsFetch.loading
  );
  const [hasFetched, setHasFetched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchIngredients());
      setHasFetched(true);
    }
  }, [dispatch, hasFetched]);

  if (isIngredientsLoading && !hasFetched) {
    return <Preloader />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={<IngredientDetails isModal={false} />}
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
