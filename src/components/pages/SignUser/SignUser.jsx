import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import Message from '../../layout/Message/Message';
import LinkButton from '../../layout/linkbutton/LinkButton';
import { useLocation } from 'react-router-dom';

const SignUser = () => {
  const location = useLocation();
  const backPage = location.pathname.replace("/signUser", '/');

  const {
    showMessage,
    messageType,
    message,
    setMessageType,
    setShowMessage,
    setMessage,
    error,
    setError,
    messageErrors,
    setMessageErrors
  } = useAuthContext();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/register', user);
      setShowMessage(true);
      setMessage('Criado com sucesso!');
      setMessageType('success');

    } catch (error) {
      if (error.response.request.status === 400) {
        setShowMessage(true);
        setMessage(`ERROR: ${error.response.data.errors}`);
        setMessageType('error');
      }
      setError(true);
      setMessageErrors(error.response.data.errors);
    }
  }

  const handlChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Cadastrar</h1>
                  <p className="text-medium-emphasis">Crie sua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nome de usuário"
                      type='text'
                      name='name'
                      value={user.name}
                      onChange={handlChange}
                      feedbackInvalid={messageErrors.name}
                      invalid={error}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      type='e-mail'
                      name='email'
                      value={user.email}
                      onChange={handlChange}
                      feedbackInvalid={messageErrors.email}
                      invalid={error}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      autoComplete="Senha"
                      name='password'
                      value={user.password}
                      onChange={handlChange}
                      feedbackInvalid={messageErrors.password}
                      invalid={error}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repetir senha"
                      autoComplete="new-password"
                      name='c_password'
                      value={user.c_password}
                      onChange={handlChange}
                      feedbackInvalid={messageErrors.c_password}
                      invalid={error}
                    />
                  </CInputGroup>
                  <div className="d-grid gap-2">
                    <CButton color="success" type='submit'>Criar Conta</CButton>
                    <LinkButton text="Voltar" customClass="#6C757D" to={backPage} />
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
    </div>
  )
}

export default SignUser;