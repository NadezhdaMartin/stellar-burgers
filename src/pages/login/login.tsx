import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getError,
  getIsAuthChecked,
  getUser,
  login
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const error = useAppSelector(getError);
  const user = useAppSelector(getUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user && isAuthChecked) {
      navigate('/');
    }
  }, [user, isAuthChecked, navigate]);

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
