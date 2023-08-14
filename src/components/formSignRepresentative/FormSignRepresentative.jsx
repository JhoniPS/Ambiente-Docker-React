import React, { useState } from 'react';

import { TextField } from '@mui/material';

import styles from './formSignRepresentative.module.css'

import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';

const options = [];

for (let i = 1; i < 36; i++) {
    options.push({
        value: 'Type' + i,
        label: 'Type' + i,
    });
}

const FormSignRepresentative = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Amostra:", {name, email})

    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    label="Nome"
                    name='name'
                    placeholder='Jhonicley P. Silva'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focused
                    margin='normal'
                    sx={{
                        width: 350,
                    }}

                />
                <TextField
                    type='e-mail'
                    label="E-mail"
                    name='email'
                    placeholder='Digite uma novo email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focused
                    sx={{
                        width: 350,
                    }}
                />

                <div>
                    <LinkButton text="Voltar" to="/representantes" customClass="button_back" />
                    <SubmitButton text="Cadastrar" customClass="button_editar_perfil" />
                </div>
            </form>
        </div >
    );
};

export default FormSignRepresentative;