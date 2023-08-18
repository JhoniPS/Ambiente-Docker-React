
import styles from './Form.module.css'

import { TextField} from '@mui/material';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

import React, { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/Auth';

const Form = () => {
    const { login, errorLogin } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit", { email, password });

        login(email, password);
    };

    return (
        <form className={styles.Form} onSubmit={handleSubmit}>
            <TextField
                type='e-mail'
                label="E-mail"
                name='email'
                placeholder='Digite seu e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focused
                sx={{
                    width:350,
                }}
                error={errorLogin}
                helperText ={errorLogin && "Digite o e-mail correto"}
            />
            <TextField
                type='password'
                label="Senha"
                name='email'
                placeholder='Digite sua senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focused
                margin='normal'
                sx={{
                    width:350,
                }}
                error={errorLogin}
                helperText ={errorLogin && "Digite a senha correta"}
            />
            
            <SubmitButton
                text="Entrar na conta"
                to="/home"
            />
        </form>
    );
};

export default Form;