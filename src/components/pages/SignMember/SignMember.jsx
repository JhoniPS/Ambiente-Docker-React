import { Fragment, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import useAuthContext from '../../contexts/Auth';
import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import LinkButton from "../../layout/linkbutton/LinkButton";
import api from '../../../services/api';

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
  CNavLink,
  CRow,
  CSpinner,
} from "@coreui/react";
import Message from "../../layout/Message/Message";

const SignMember = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    entry_date: '',
    departure_date: '',
  });
  const [membersList, setMembersList] = useState([]);

  const location = useLocation();
  const backPage = location.pathname.replace("/adicionar-membro", '');

  const {
    message,
    messageType,
    showMessage,
    setShowMessage,
    setMessage,
    setMessageType,
    error,
    setError,
    messageErrors,
    setMessageErrors,
  } = useAuthContext();

  const handleSubmit = (e) => {
    setMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post(`groups/${id}/members`, membersList);
      setLoading(false);

      setMessage('Membro adicionado com sucesso!');
      setMessageType('success');
      setShowMessage(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setMessageErrors(error.response.data.errors);
    }
  };

  const handleAddMembers = () => {
    setMembersList((prevList) => [...prevList, member]);

    setMember({
      name: '',
      email: '',
      role: '',
      phone: '',
      entry_date: '',
      departure_date: '',
    });
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
                  <CCardHeader component="h2" className="d-flex justify-content-between">
                    Cadastrar Membros{" "}
                    <CNavLink to={backPage} component={NavLink}>
                      <AiOutlineClose size={30} />
                    </CNavLink>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="d-flex flex-column gap-2" onSubmit={Submit}>
                      <CFormInput
                        type="text"
                        name="name"
                        label="Nome"
                        placeholder="Ex. Luiza"
                        value={member.name}
                        onChange={handleSubmit}
                      />
                      <CFormInput
                        type="email"
                        name="email"
                        label="E-mail"
                        placeholder="name@example.com"
                        value={member.email}
                        onChange={handleSubmit}
                      />
                      <CFormInput
                        type="tel"
                        label="Telefone"
                        name="phone"
                        placeholder="Digite o numero de telefone"
                        value={member.phone}
                        onChange={handleSubmit}
                      />
                      <CFormInput
                        type="text"
                        label="Cargo"
                        name="role"
                        placeholder="Exemplo Professor"
                        value={member.role}
                        onChange={handleSubmit}
                      />
                      <CRow className="d-flex gap-2">
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
                            type="date"
                            label="Data de saida"
                            name="departure_date"
                            value={member.departure_date}
                            onChange={handleSubmit}
                          />
                        </CCol>
                      </CRow>

                      <CRow className="d-flex justify-content-around mt-3">
                        <CCol>
                          <LinkButton text="Voltar" customClass="#6C757D" to={backPage} />
                        </CCol>

                        <CCol className="d-flex justify-content-center">
                          <CButton
                            color="primary"
                            style={{ color: 'white', paddingInline: '1em' }}
                            type="button"
                            onClick={handleAddMembers}
                          >
                            Adicionar Membros
                          </CButton>
                        </CCol>

                        <CCol className="d-flex justify-content-end">
                          <CButton
                            color="success"
                            style={{ color: 'white', paddingInline: '1em', marginRight: '1em' }}
                            type="button"
                            onClick={Submit}
                          >
                            {loading ? (
                              <>
                                <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                              </>
                            ) : (
                              <>Enviar</>
                            )}
                          </CButton>
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
  );
};

export default SignMember;
