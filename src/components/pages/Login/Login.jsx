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

import logo from '../../../img/BrasãoUfopa.png'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, error, messageErrors } = useAuthContext();

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
                                        <p className="text-medium-emphasis">Utilize as credenciais do SIGAA</p>

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
                                            <CCol xs={12} className="mb-4">
                                                <CButton color="primary" className="px-5" type='submit'>
                                                    Entrar
                                                </CButton>
                                            </CCol>

                                            <CCol xs={12} className='d-flex justify-content-evenly mb-4'>
                                                <img
                                                    className="d-flex rounded-circle border-0 justify-content-center align-items-center"
                                                    style={{ width: '60px', height: '60px' }}
                                                    src={logo}
                                                    alt='Login com SIGAA'
                                                    onClick={() => { alert("Redirecionar") }}
                                                />
                                                <CButton
                                                    className="d-flex rounded-circle border-0 justify-content-center align-items-center"
                                                    style={{ width: '60px', height: '60px' }}
                                                    onClick={() => { alert("kjoj") }}
                                                >
                                                    <IconContext.Provider value={{ size: 50 }}>
                                                        <BsPersonFillAdd />
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