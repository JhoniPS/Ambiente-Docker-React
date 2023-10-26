import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';

import styles from './formEditTypeUser.module.css'
import LinkButton from '../../layout/linkbutton/LinkButton';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import { TextField } from '@mui/material';

const FormSignTypeUser = () => {
    const { error, messageErrors } = useAuthContext();
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    label="Nome"
                    name='name'
                    placeholder='Editar tipo de usuário'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focused
                    error={error}
                    helperText={messageErrors.name}
                    margin='normal'
                    sx={{
                        width: 350,
                    }}
                />

                <div>
                    <LinkButton text="Voltar" to="/Tipos-de-Usuarios" customClass="button_back" />
                    <SubmitButton text="Editar" customClass="button_editar_perfil" />
                </div>
            </form>
        </div >
    );
};

export default FormSignTypeUser;