
import styles from './FormProfile.module.css'
import { TextField } from '@mui/material';

import React, { useState } from 'react';

import Upload from '../Upload/Upload';
import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';

const FormProfile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errorEditor, setErrorEditor] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name !== "Jhonicley P Silva" && email !== "teste@teste.com")
            setErrorEditor(true);
        else
            setErrorEditor(false);
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    label="Nome"
                    name='name'
                    placeholder='Digite o nome do perfil'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focused
                    margin='normal'
                    sx={{
                        width: 350,
                    }}
                    error={errorEditor}
                    helperText={errorEditor && "Digite o nome correto"}
                />
                <TextField
                    type='e-mail'
                    label="E-mail"
                    name='email'
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focused
                    sx={{
                        width: 350,
                    }}
                    error={errorEditor}
                    helperText={errorEditor && "Digite o e-mail correto"}
                />
                <p>Carregue uma nova foto</p>
                <Upload />
                <div>
                    <LinkButton text="Voltar" to="/profile" customClass="button_back" />
                    <SubmitButton text="Editar Perfil" customClass="button_editar_perfil" />
                </div>
            </form>
        </div>
    );
};

export default FormProfile;