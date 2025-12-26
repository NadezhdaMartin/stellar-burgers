import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getError, register } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(getError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('Submitting registration:', { userName, email, password });
    const resultAction = await dispatch(
      register({ name: userName, email, password })
    );
    console.log('Register result:', resultAction);

    if (register.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
