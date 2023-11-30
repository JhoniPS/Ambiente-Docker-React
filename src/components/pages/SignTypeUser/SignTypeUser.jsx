import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

import styles from './SignTypeUser.module.css'
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';

import LinkButton from '../../layout/linkbutton/LinkButton';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import HeaderBar from '../../layout/header/HeaderBar';
import { TextField } from '@mui/material';

const SignTypeUser = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [messageErrors, setMessageErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/type-user', { name }).then(() => {
        navigate('/Tipos-de-Usuarios', {
          state: {
            message: 'Tipo de usuário criado com sucesso!',
            messageType: 'success',
            showMessage: true,
          }
        });
      })
    } catch (error) {
      setError(true);
      setMessageErrors(error.response.data);
    }
  }

  return (
    <Fragment>
      <HeaderBar
        text="PAINEL DE CONTROLE"
        backPageIcon={<ImArrowLeft2 size={25} />}
        backPage="/Tipos-de-Usuarios"
      />
      <div className={styles.sign_type_user}>
        <section>
          <h4>Cadastrar novo tipo</h4>
          <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <div style={{ width: '100%' }}>
                <TextField
                  type='text'
                  label="Nome"
                  name='name'
                  placeholder='Novo tipo de usuário'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focused
                  error={error}
                  helperText={messageErrors.name}
                  margin='normal'
                  sx={{
                    width: '100%',
                  }}
                />
              </div>
              <div>
                <LinkButton text="Voltar" to="/Tipos-de-Usuarios" customClass="button_back" />
                <SubmitButton text="Cadastrar" customClass="button_editar_perfil" />
              </div>
            </form>
          </div >
        </section>
      </div>
    </Fragment>
  )
}

export default SignTypeUser;