import React, { useState } from 'react';

import { TextField } from '@mui/material';

import styles from './formSignGroup.module.css'

import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';

const FormSignGroup = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Amostra:", { name })

    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.container_form}>
                    <div className={styles.container_text1}>
                        <TextField
                            type='text'
                            label="Nome do Representante"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Entidade"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Orgão"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                    </div>

                    <div className={styles.container_text2}>
                        <TextField
                            type='text'
                            label="Conselho"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Portaria"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Sigla"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Equipe"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                    </div>

                    <div className={styles.container_text3}>
                        <div>
                            <TextField
                                type='text'
                                label="E-mail"
                                name='name'
                                placeholder='Jhonicley P. Silva'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Observações"
                                name='name'
                                placeholder='Jhonicley P. Silva'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focused
                                margin='normal'
                                multiline
                                rows={4.5}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </div>

                        <div>
                            <TextField
                                type='text'
                                label="Unidade"
                                name='name'
                                placeholder='Jhonicley P. Silva'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Oficio que solicitou"
                                name='name'
                                placeholder='Jhonicley P. Silva'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Oficio que indicou"
                                name='name'
                                placeholder='Jhonicley P. Silva'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.button}>
                    <LinkButton text="Voltar" to="/groups" customClass="button_back" />
                    <SubmitButton text="Cadastrar" customClass="button_editar_perfil" />
                </div>
            </form>
        </div >
    );
};

export default FormSignGroup;