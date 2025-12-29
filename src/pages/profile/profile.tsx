import { ProfileUI } from '@ui-pages';
import { TUser } from '@utils-types';
import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, updateUserData } from '../../services/slices/userSlice';
import { useAppDispatch } from '../../services/store';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userData = useSelector(getUser);
  const dispatch = useAppDispatch();

  // сравнение текущего значения с тем, что было при открытии формы, а не с текущим значением из стора.создаёт мутабельный объект, который сохраняется между ререндерами и не вызывает перерисовку при изменении
  const initialRef = useRef({
    name: userData?.name ?? '',
    email: userData?.email ?? ''
  });

  const [formValue, setFormValue] = useState({
    name: userData?.name ?? '',
    email: userData?.email ?? '',
    password: ''
  });

  useEffect(() => {
    if (userData) {
      initialRef.current = {
        name: userData.name ?? '',
        email: userData.email ?? ''
      };
      setFormValue({
        name: userData.name ?? '',
        email: userData.email ?? '',
        password: ''
      });
    }
  }, [userData]);

  const isFormChanged =
    formValue.name !== initialRef.current.name ||
    formValue.email !== initialRef.current.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;
    const { name, email, password } = formValue;
    const payload: Partial<TRegisterData> = {};
    if (name !== initialRef.current.name) payload.name = name;
    if (email !== initialRef.current.email) payload.email = email;
    if (password) payload.password = password;
    dispatch(updateUserData(formValue))
      .unwrap()
      .then((response) => {
        initialRef.current = {
          name: response.user.name,
          email: response.user.email
        };
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: initialRef.current.name ?? '',
      email: initialRef.current.email ?? '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
