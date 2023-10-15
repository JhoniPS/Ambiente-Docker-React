import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';

import { TextField } from '@mui/material';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import styles from './Form.module.css'

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, messageErrors } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
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
                helperText={messageErrors.email}
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
                helperText={messageErrors.password}
            />

            <SubmitButton
                text="Entrar na conta"
                to="/home"
            />
        </form>
    );
};

export default Form;