import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
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
import { ProtectedRoute } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/slices/userSlice';

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

  //проверка токенов
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

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
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth children={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth children={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute children={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute children={<OrderInfo isModal={false} />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                dataCy='ingredient-modal'
                title='Детали ингредиента'
                onClose={() => navigate(-1)}
              >
                <IngredientDetails isModal />
              </Modal>
            }
          />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute children={<OrderInfoModal />} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
