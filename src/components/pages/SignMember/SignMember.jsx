import { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import LinkButton from "../../layout/linkbutton/LinkButton";
import api from '../../../services/api'

import HeaderBar from '../../layout/header/HeaderBar';
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

const SignMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState({
    email: '',
    role: '',
    phone: '',
    entry_date: '',
    departure_date: '',
  });


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setMember(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`group/${id}/members`, { member });
      navigate(`/detalhes-de-grupos-representante/${id}/`, {
        state: {
          message: 'Adicionado com sucesso!',
          messageType: 'success',
          showMessage: true,
        }
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error.response.data);
    }
  };

  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={`/detalhes-de-grupos-representante/${id}/`} />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={10} sm={4} xl={12}>
              <CCardGroup>
                <CCard>
                  <CCardHeader>Cadastrar Membros</CCardHeader>
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
                          <LinkButton text="Voltar" customClass="secondary" to={"/detalhes-de-grupos-representante/id/"} />
                          <CButton color="primary" className="px-4" type="submit">Cadastrar</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </Fragment>
  )
}

export default SignMember;