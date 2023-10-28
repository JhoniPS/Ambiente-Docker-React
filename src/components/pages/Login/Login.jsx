import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';

import { TextField } from '@mui/material';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import styles from './Login.module.css'
import img from '../../../img/BrasãoUfopa.png'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    return (
        <div className={styles.login}>
            <section>
                <img src={img} alt='Logo da UFOPA' />
                <h4>Documentos e Comissões</h4>
                <h5>Seja bem vindo(a)!</h5>
                <p>Digite seu e-mail institucional e a senha para realizar o login.</p>
                <form className={styles.Form} onSubmit={handleLogin}>
                    <TextField
                        type='e-mail'
                        label="E-mail"
                        name='email'
                        autoComplete="On"
                        placeholder='Digite seu e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        focused
                        sx={{ width: 350 }}
                        error={error}
                        helperText={messageErrors.email || messageErrors}
                        onKeyDown={handleKeyDown}
                    />

                    <TextField
                        type='password'
                        label="Senha"
                        name='password'
                        autoComplete="On"
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        focused
                        margin='normal'
                        sx={{ width: 350 }}
                        error={error}
                        helperText={messageErrors.password || messageErrors}
                        onKeyDown={handleKeyDown}
                    />

                    <SubmitButton text="Entrar na conta" to="/home" />
                </form>
            </section>
        </div>
    );
};

export default Login;