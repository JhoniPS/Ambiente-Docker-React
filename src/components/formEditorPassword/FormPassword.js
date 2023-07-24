
import styles from './FormPassword.module.css'
import { TextField } from '@mui/material';

import React, { useState } from 'react';

import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';

const FormPassword = () => {
    const [password, setPassword] = useState("");
    const [Newpassword, setNewPassword] = useState("");
    const [verificationPassword, setVerificationPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== "123")
            setErrorPassword(true);
        else
            setErrorPassword(false);

        console.log(password, Newpassword, verificationPassword)
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <TextField
                    type='password'
                    label="Senha"
                    name='password'
                    placeholder='Digite a senha antiga'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    focused
                    margin='normal'
                    sx={{
                        width: 350,
                    }}
                    error={errorPassword}
                    helperText={errorPassword && "Digite o nome correto"}
                />
                <TextField
                    type='password'
                    label="Nova Senha"
                    name='new password'
                    placeholder='Digite uma nova senha'
                    value={Newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    focused
                    sx={{
                        width: 350,
                    }}
                    error={errorPassword}
                    helperText={errorPassword && "Erro de digitação"}
                />
                <TextField
                    type='password'
                    label="Confirme a nova senha"
                    name='new password'
                    placeholder='Confirmação de senha'
                    value={verificationPassword}
                    onChange={(e) => setVerificationPassword(e.target.value)}
                    focused
                    sx={{
                        width: 350,
                    }}
                    error={errorPassword}
                    helperText={errorPassword && "Erro de digitação"}
                />
                <div>
                    <LinkButton text="Voltar" to="/profile" customClass="button_back" />
                    <SubmitButton text="Editar Perfil" customClass="button_editar_perfil" />
                </div>
            </form>
        </div>
    );
};

export default FormPassword;