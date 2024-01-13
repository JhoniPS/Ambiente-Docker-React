import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const SignUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   if (location.state) {
  //     setMessage(location.state.message);
  //     setMessageType(location.state.messageType);
  //     setShowMessage(location.state.showMessage);
  //   }

  //   window.history.replaceState(null, '');

  // }, [location.state]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors({
        name: '',
        email: '',
        password: '',
        c_password: '',
      });

      await api.post('/register', user).then(() => {  
        setShowMessage(true);
        setMessage('Criado com sucesso!');
        setMessageType('success');
      });

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
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Criar Conta</CButton>
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