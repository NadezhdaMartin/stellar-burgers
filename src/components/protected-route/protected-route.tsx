import { getIsAuthChecked, getUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { ProtectedRouteProps } from './type';
import { useAppSelector } from '../../services/store';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  //пользователь авторизован, но должен быть не авторизован(страница только для гостей).редирект на главную
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  //пользователь не авторизован, но должен быть авторизован.редирект на логин
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  //пользователь авторизован и должен быть авторизован

  //пользователь не авторизован и не должен быть авторизован

  return children;
};
