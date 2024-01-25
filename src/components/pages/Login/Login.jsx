import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../contexts/Auth';
import logoImg from '../../../img/BrasãoUfopa.png';
import { IconContext } from "react-icons";

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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { cilLockLocked, cilUser } from '@coreui/icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsPersonFillAdd } from "react-icons/bs";

import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, logoutSIGAA, sigaaLogin, error, messageErrors } = useAuthContext();

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
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm style={{ textAlign: 'center' }} onSubmit={handleLogin}>
                                        <CImage src={logoImg} width={80} />
                                        <h1>Login</h1>

                                        <CInputGroup className="mb-3">
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
                                            />
                                        </CInputGroup>

                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>

                                            <CFormInput
                                                type={showPassword ? "text" : "password"}
                                                name='password'
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoFocus={true}
                                                onKeyDown={handleKeyDown}
                                            />

                                            <CButton
                                                color="light"
                                                onClick={handleClickShowPassword}
                                                style={{
                                                    backgroundColor: 'var(--cui-input-group-addon-bg, #d8dbe0)',
                                                    border: '1px solid var(--cui-input-group-addon-border-color, #b1b7c1)'
                                                }}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna entre ícones de olho aberto e fechado */}
                                            </CButton>
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={12} className='d-flex mb-4 gap-3 justify-content-center'>
                                                <CButton color="primary" type='submit' style={{ width: '7em' }}>
                                                    Login
                                                </CButton>

                                                <a href="http://localhost:8001/api/redirect" target="_blank" rel="noopener noreferrer">
                                                    <CButton
                                                        color="secondary"
                                                    > Login SIGAA</CButton>
                                                </a>
                                            </CCol>

                                            <CCol xs={12} className='d-flex mb-4 gap-3 justify-content-center'>
                                                <CButton
                                                    color="secondary"
                                                    onClick={(e) => { e.preventDefault(); navigate('/signUser') }}
                                                >
                                                    <IconContext.Provider value={{ size: 20 }}>
                                                        <BsPersonFillAdd /> Cadastrar
                                                    </IconContext.Provider>
                                                </CButton>

                                                <CButton
                                                    color="secondary"
                                                    onClick={logoutSIGAA}
                                                >
                                                    <IconContext.Provider value={{ size: 20 }}>
                                                        <BsPersonFillAdd /> Logout SIGAA
                                                    </IconContext.Provider>
                                                </CButton>
                                            </CCol>

                                            <CCol xs={12}>
                                                <a href="/forget-password" onClick={(e) => { e.preventDefault(); navigate('/forget-password') }} target="_blank" rel="noopener noreferrer">
                                                    Esqueci minha senha
                                                </a>
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
    );
};

export default Login;