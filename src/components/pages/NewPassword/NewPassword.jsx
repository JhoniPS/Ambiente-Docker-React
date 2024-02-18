import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import LinkButton from '../../layout/linkbutton/LinkButton'
import { useLocation } from 'react-router-dom';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';
import { cilLockLocked, cilShieldAlt } from '@coreui/icons';
import Message from '../../layout/Message/Message';

function NewPassword() {

    const location = useLocation();
    const backPage = location.pathname.replace("/nova-senha", '/');

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

    const [password, setPassword] = useState({
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/register', password);
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
        setPassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={9} xl={10}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleSubmit}>
                                    <h1>Criar nova senha</h1>
                                    <p className="text-medium-emphasis">Crie uma nova senha</p>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                            placeholder="E-mail do usuário"
                                            autoComplete="email"
                                            type='e-mail'
                                            name='email'
                                            value={password.email}
                                            onChange={handlChange}
                                            feedbackInvalid={messageErrors.email}
                                            invalid={error}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilShieldAlt} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Token enviado por e-mail"
                                            type='text'
                                            name='email'
                                            value={password.token}
                                            onChange={handlChange}
                                            feedbackInvalid={messageErrors.token}
                                            invalid={error}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Digite a senha"
                                            autoComplete="Senha"
                                            name='password'
                                            value={password.password}
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
                                            placeholder="Confirmar a nova senha"
                                            name='c_password'
                                            value={password.password_confirmation}
                                            onChange={handlChange}
                                            feedbackInvalid={messageErrors.password_confirmation}
                                            invalid={error}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid gap-2">
                                        <CButton color="success" type='submit'>Nova senha</CButton>
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

export default NewPassword