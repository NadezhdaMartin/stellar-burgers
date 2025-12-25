import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '@ui';

//для получения номера заказа для title в модальном окне
const OrderInfoModal: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const title = number ? `#${number.padStart(6, '0')}` : 'Заказ';

  return (
    <Modal title={title} onClose={() => navigate(-1)}>
      <OrderInfo isModal />
    </Modal>
  );
};

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isIngredientsLoading = useAppSelector(
    (state: RootState) => state.ingredientsFetch.loading
  );
  const [hasFetched, setHasFetched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.background;

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
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo isModal={false} />} />
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
          <Route path='/feed/:number' element={<OrderInfoModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
