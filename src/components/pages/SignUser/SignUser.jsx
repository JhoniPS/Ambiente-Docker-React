import React, { useEffect, useState, Fragment } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import styles from './SignUser.module.css'
import LinkButton from '../../layout/linkbutton/LinkButton';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import HeaderBar from '../../layout/header/HeaderBar';

import { Select, ConfigProvider } from 'antd';
import { TextField } from '@mui/material';
import { ImArrowLeft2 } from "react-icons/im";

const SignUser = () => {
  const { token } = useAuthContext();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    c_password: '',
    type_user_id: '',
  });

  const [type_user, setType_user] = useState(0);
  const [option, setOption] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      ...user,
      type_user_id: type_user.id
    }

    try {
      setErrors({
        email: '',
        password: '',
        c_password: '',
        type_user_id: '',
      });

      const reponse = await api.post('/register', updateUser)
      console.log(reponse.data)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  }

  const handlChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChange = (value, option) => {
    setType_user({
      id: value,
      name: option?.label
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const apiResponse = await api.get('type-user');
          const options = apiResponse.data.map(type => ({
            value: type.id,
            label: type.name,
          }));
          setOption(options);
        }
      } catch (error) {
        if (error.response.status === 401) {
          // Trate o erro 401 aqui, por exemplo, redirecionando o usuário para a página de login.
        }
      }
    }

    fetchData();
  }, [token]);


  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/users" />
      <div className={styles.sign_user}>
        <section>
          <h4>Cadastrar Usuário</h4>
          <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <div className={styles.containerInput}>
                <TextField
                  type='text'
                  label="Nome"
                  name='name'
                  placeholder='Jhonicley P. Silva'
                  value={user.name}
                  onChange={handlChange}
                  focused
                  sx={{
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.containerInput}>
                <TextField
                  type='e-mail'
                  label="E-mail"
                  name='email'
                  placeholder='Digite uma nova senha'
                  value={user.email}
                  onChange={handlChange}
                  focused
                  sx={{
                    width: '100%',
                  }}
                  helperText={errors.email}
                  error={Boolean(errors.email)}
                />
              </div>

              <div className={styles.containerInput}>
                <TextField
                  type='password'
                  label="Senha"
                  name='password'
                  placeholder='Digite uma nova senha'
                  value={user.password}
                  onChange={handlChange}
                  focused
                  sx={{
                    width: '100%',
                  }}
                  helperText={errors.password}
                  error={Boolean(errors.password)}
                />
              </div>

              <div className={styles.containerInput}>
                <TextField
                  type='password'
                  label="Confirmação de senha"
                  name='c_password'
                  placeholder='Digite a senha novamente'
                  value={user.c_password}
                  onChange={handlChange}
                  focused
                  sx={{
                    width: '100%',
                  }}
                  helperText={errors.c_password}
                  error={Boolean(errors.c_password)}
                />
              </div>

              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: '#2C74AC',
                    lineWidth: 2,
                    controlHeight: 45,
                  },
                }}
              >
                <Select
                  showSearch
                  getPopupContainer={(trigger) => {
                    return trigger;
                  }}
                  style={{
                    width: '100%',
                  }}
                  size='large'
                  label="Tipo de Usuário"
                  placeholder="Selecione um tipo de usuário"
                  onChange={onChange}
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={option}
                />
              </ConfigProvider>

              <div>
                <LinkButton text="Voltar" to="/users" customClass="button_back" />
                <SubmitButton text="Cadastrar" customClass="button_editar_perfil" />
              </div>
            </form>
          </div >
        </section>
      </div>
    </Fragment>
  )
}

export default SignUser;