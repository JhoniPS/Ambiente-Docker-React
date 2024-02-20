import React, { useState } from 'react'
import api from '../../../services/api';
import useAuthContext from '../../contexts/Auth';
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
    CSpinner
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useLocation } from 'react-router-dom';
import { cilLockLocked, cilShieldAlt } from '@coreui/icons';
import LinkButton from '../../layout/linkbutton/LinkButton'
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

    const [emailRecovery, setEmailRecovery] = useState("");
    const [loading, setLoading] = useState(false);

    const handlSubmitToken = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/forgot-password', { email: emailRecovery });
            setLoading(false);
            setShowMessage(true);
            setMessage('E-mail com sucesso!');
            setMessageType('success');
        } catch (error) {
            setShowMessage(true);
            setMessage('E-mail não enviado!');
            setMessageType('error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/reset-password', password);
            setShowMessage(true);
            setMessage('Nova senha criada com sucesso!');
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
                                <h1>Criar nova senha</h1>

                                <p className="text-medium-emphasis">E-mail para obter o token</p>
                                <CForm onSubmit={handlSubmitToken}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                            placeholder="E-mail do usuário"
                                            autoComplete="email"
                                            type='e-mail'
                                            name='emailRecovery'
                                            value={emailRecovery}
                                            onChange={(e) => setEmailRecovery(e.target.value)}
                                            feedbackInvalid={messageErrors.email}
                                            invalid={error}
                                        />

                                        <CButton color="success" type='submit'>
                                            {loading ? <><CSpinner component="span" size="sm" aria-hidden="true" /> Loading...</> : <>Feito</>}
                                        </CButton>
                                    </CInputGroup>
                                </CForm>

                                <CForm onSubmit={handleSubmit}>
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