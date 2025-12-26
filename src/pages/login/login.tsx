import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
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
  const isAuthChecked = useSelector(getIsAuthChecked);
  const error = useSelector(getError);
  const user = useSelector(getUser);

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
