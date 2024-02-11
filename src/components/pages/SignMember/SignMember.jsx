import { Fragment, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAuthContext from '../../contexts/Auth';
import MenuAppBar from "../../layout/AppBar/MenuAppBar"
import LinkButton from "../../layout/linkbutton/LinkButton";
import api from '../../../services/api'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow
} from "@coreui/react";
import Message from "../../layout/Message/Message";

const SignMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState({
    email: '',
    role: '',
    phone: '',
    entry_date: '',
    departure_date: '',
  });

  const location = useLocation();
  const backPage = location.pathname.replace("/adicionar-membro", '');

  const { message, messageType, showMessage, setShowMessage, setMessage, setMessageType } = useAuthContext();

  const handleSubmit = (e) => {
    setMember(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`groups/${id}/members`, { member });
      setMessage('Adicionado com sucesso!')
      setMessageType('success')
      setShowMessage(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error.response.data);
      setMessage('Ops! hover um error')
      setMessageType('error')
      setShowMessage(true);
    }
  };

  return (
    <Fragment>
      <MenuAppBar backStep={backPage} />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={10} sm={4} xl={12}>
              <CCardGroup>
                <CCard>
                  <CCardHeader component="h2">Cadastrar Membros</CCardHeader>
                  <CCardBody>
                    <CForm className="d-flex flex-column gap-2" onSubmit={Submit}>
                      <CFormInput
                        type="email"
                        name="email"
                        label="E-mail"
                        placeholder="name@example.com"
                        value={member.email}
                        onChange={handleSubmit}
                      />
                      <CFormInput
                        type='tel'
                        label="Telefone"
                        name='phone'
                        placeholder="Digite o numero de telefone"
                        value={member.phone}
                        onChange={handleSubmit}
                      />
                      <CFormInput
                        type='text'
                        label="Cargo"
                        name='role'
                        placeholder=' Exemplo Professor'
                        value={member.role}
                        onChange={handleSubmit}
                      />
                      <div className="d-flex gap-2">
                        <CCol>
                          <CFormInput
                            type="date"
                            label="Data de entrada"
                            name="entry_date"
                            value={member.entry_date}
                            onChange={handleSubmit}

                          />
                        </CCol>
                        <CCol>
                          <CFormInput
                            type='date'
                            label="Data de saida"
                            name="departure_date"
                            value={member.departure_date}
                            onChange={handleSubmit}
                          />
                        </CCol>
                      </div>
                      <CRow >
                        <CCol xs={12} className="d-flex mt-4 justify-content-center gap-4">
                          <LinkButton text="Voltar" customClass="#6C757D" to={backPage} />
                          <CButton style={{ background: '#548CA8', color: 'white', paddingInline: '1em' }} color="null" type="submit">Cadastrar</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
      </div>
    </Fragment>
  )
}

export default SignMember;