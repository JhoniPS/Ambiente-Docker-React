import React, { useState, useEffect } from 'react';
import useAuthContext from '../../contexts/Auth';
import logoImg from '../../../img/BrasãoUfopa.png';

import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CImage,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CLink,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { cilUser } from '@coreui/icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from '../../layout/Message/Message';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();

    const { login, error, messageErrors, showMessage, messageType, message, setShowMessage, setCodeCallback } = useAuthContext();

    useEffect(() => {
        const codeSIGGA = new URLSearchParams(location.search).get('code');
        setCodeCallback(codeSIGGA);
    }, [location.search, setCodeCallback]);


    const handleLogin = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-2">
                                <CCardBody>
                                    <CForm style={{ textAlign: 'center' }} onSubmit={handleLogin}>
                                        <CImage src={logoImg} width={80} />
                                        <h1>{process.env.REACT_APP_TITLE}</h1>

                                        <CInputGroup className="mb-3" style={{ textAlign: 'left' }}>
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>

                                            <CFormInput
                                                type='e-mail'
                                                name='email'
                                                autoComplete="On"
                                                placeholder='Digite seu e-mail'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                feedbackInvalid={messageErrors.email}
                                                invalid={error}
                                            />
                                        </CInputGroup>

                                        <CInputGroup className="mb-4" style={{ textAlign: 'left' }}>
                                            <CButton
                                                color="light"
                                                onClick={handleClickShowPassword}
                                                style={{
                                                    backgroundColor: 'var(--cui-input-group-addon-bg, #d8dbe0)',
                                                    border: '1px solid var(--cui-input-group-addon-border-color, #b1b7c1)'
                                                }}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </CButton>

                                            <CFormInput
                                                type={showPassword ? "text" : "password"}
                                                name='password'
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoFocus={true}
                                                onKeyDown={handleKeyDown}
                                                feedbackInvalid={messageErrors.password}
                                                invalid={error}
                                            />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={12} className='d-flex justify-content-between mb-2'>
                                                <CLink href='/nova-senha'>Esqueceu a senha?</CLink>
                                                <CLink href='/cadastrar-conta'>Criar nova conta</CLink>
                                            </CCol>
                                            <CCol xs={12} className='d-grid gap-3 '>
                                                <CButton color="primary" type='submit'>
                                                    Login
                                                </CButton>
                                                <CButton color="success" href='https://autenticacao.dev.ufopa.edu.br/authz-server/oauth//authorize?client_id=piape-vania-id&response_type=code&redirect_uri=http://localhost:3000'>
                                                    Login conta SIGAA
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </CContainer>
        </div>
    );
};

export default Login;