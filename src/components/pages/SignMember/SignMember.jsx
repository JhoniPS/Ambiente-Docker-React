import React, { Fragment, useState } from "react";
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
    setError,
    setMessageErrors,
  } = useAuthContext();

  const inputValidation = {
    name: (value) => (value ? '' : 'Campo obrigatório'),
    email: (value) => (value ? '' : 'Campo obrigatório'),
    role: (value) => (value ? '' : 'Campo obrigatório'),
    phone: (value) => (value ? '' : 'Campo obrigatório'),
    entry_date: (value) => (value ? '' : 'Campo obrigatório'),
    departure_date: (value) => (value ? '' : 'Campo obrigatório'),
  };

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    entry_date: '',
    departure_date: '',
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    Object.entries(member).forEach(([key, value]) => {
      const errorMessage = inputValidation[key](value);
      newErrors[key] = errorMessage;
      if (errorMessage) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    setMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  const handleAddMembers = () => {
    if (validateInputs()) {
      setMembersList((prevList) => [...prevList, member]);
      setMessage('Membro adicionado com sucesso!');
      setMessageType('success');
      setShowMessage(true);

      setMember({
        name: '',
        email: '',
        role: '',
        phone: '',
        entry_date: '',
        departure_date: '',
      });
      setErrors({
        name: '',
        email: '',
        role: '',
        phone: '',
        entry_date: '',
        departure_date: '',
      });
    } else {
      setMessage('Preencha todos os campos obrigatórios.');
      setMessageType('error');
      setShowMessage(true);
    }
  };

  const canSubmit = () => membersList.length > 0;

  const Submit = async () => {
    if (canSubmit()) {
      try {
        setLoading(true);
        await api.post(`groups/${id}/members`, membersList);
        setLoading(false);
        setMessage('Membros cadastrados com sucesso!');
        setMessageType('success');
        setShowMessage(true);
      } catch (error) {
        setLoading(false);
        setError(true);
        setMessage(error.response.data.errors);
        setMessageType('error');
        setShowMessage(true);
        setMessageErrors(error.response.data.errors);
      }
    } else {
      setMessage('Adicione pelo menos um membro antes de cadastrar.');
      setMessageType('error');
      setShowMessage(true);
    }
  };

  return (
    <Fragment>
      <MenuAppBar backStep={backPage} />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol>
              <CCardGroup>
                <CCard>
                  <CCardHeader component="h2" className="d-flex justify-content-between">
                    Cadastrar Membros{" "}
                    <CNavLink to={backPage} component={NavLink}>
                      <AiOutlineClose size={30} />
                    </CNavLink>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="d-flex flex-column" onSubmit={Submit}>
                      <CFormInput
                        type="text"
                        name="name"
                        label="Nome"
                        placeholder="Ex. Luiza"
                        value={member.name}
                        onChange={handleSubmit}
                        feedbackInvalid={errors.name}
                        invalid={errors.name !== ''}
                      />
                      <CFormInput
                        type="email"
                        name="email"
                        label="E-mail"
                        placeholder="name@example.com"
                        value={member.email}
                        onChange={handleSubmit}
                        feedbackInvalid={errors.email}
                        invalid={errors.email !== ''}
                      />
                      <CFormInput
                        type="tel"
                        label="Telefone"
                        name="phone"
                        placeholder="Digite o numero de telefone"
                        value={member.phone}
                        onChange={handleSubmit}
                        feedbackInvalid={errors.phone}
                        invalid={errors.phone !== ''}
                      />
                      <CFormInput
                        type="text"
                        label="Cargo"
                        name="role"
                        placeholder="Exemplo Professor"
                        value={member.role}
                        onChange={handleSubmit}
                        feedbackInvalid={errors.role}
                        invalid={errors.role !== ''}
                      />
                      <CRow className="d-flex gap-2">
                        <CCol>
                          <CFormInput
                            type="date"
                            label="Data de entrada"
                            name="entry_date"
                            value={member.entry_date}
                            onChange={handleSubmit}
                            feedbackInvalid={errors.entry_date}
                            invalid={errors.entry_date !== ''}
                          />
                        </CCol>
                        <CCol>
                          <CFormInput
                            type="date"
                            label="Data de saida"
                            name="departure_date"
                            value={member.departure_date}
                            onChange={handleSubmit}
                            feedbackInvalid={errors.departure_date}
                            invalid={errors.departure_date !== ''}
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
                            Adiciona Membro
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
                              <>Cadastrar Membros</>
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
