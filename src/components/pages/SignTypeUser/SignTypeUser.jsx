import React, { useState, Fragment } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import LinkButton from '../../layout/linkbutton/LinkButton';
import MenuAppBar from '../../layout/AppBar/MenuAppBar'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow
} from '@coreui/react';
import Message from '../../layout/Message/Message';
import { useLocation } from 'react-router-dom';

const SignTypeUser = () => {
  const [name, setName] = useState("");

  const location = useLocation();
  const backPage = location.pathname.replace("/novo-tipo", '');

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
  } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/type-users', { name });

      setMessage('Tipo de usuário criado com sucesso!');
      setMessageType('success');
      setShowMessage(true);
    } catch (error) {
      setError(true)
      setMessageErrors(error.response.data.name);
    }
  }

  return (
    <Fragment>
      <MenuAppBar backStep='/administrador' />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={9}>
              <CCard className="mx-4">
                <CCardHeader component="h2">Novo Tipo de Usuário</CCardHeader>
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    <CFormInput
                      type='text'
                      label="Tipo de Usuario"
                      name='name'
                      placeholder='Novo tipo de usuário'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      feedbackInvalid={messageErrors}
                      invalid={error}
                    />
                    <div className="d-flex mt-5 justify-content-between">
                      <LinkButton text="Voltar" customClass="#6C757D" to={backPage} />
                      <CButton color="success" type='submit'>Criar Conta</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
    </Fragment>
  )
}

export default SignTypeUser;