import React, { useState } from 'react';

import { TextField } from '@mui/material';

import styles from './formEditGroup.module.css'

import LinkButton from '../../layout/linkbutton/LinkButton';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

const FormSignGroup = () => {
    const [form, setForm] = useState({
        name: "",
        entity: "",
        organ: "",
        council: "",
        concierge: "",
        sigla: "",
        equip: "",
        email: "",
        comments: "",
        unit: "",
        OfficeRequested: "",
        AppointedOffice: "",
    });


    const Submit = (e) => {
        e.preventDefault();

        console.log(form);
    };

    const handleSubmit = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <form className={styles.form} onSubmit={Submit}>
                <div className={styles.container_form}>
                    <div className={styles.container_text1}>
                        <TextField
                            type='text'
                            label="Nome do Representante"
                            name='name'
                            placeholder='Jhonicley P. Silva'
                            value={form.name}
                            onChange={handleSubmit}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Entidade"
                            name='entity'
                            placeholder='Jhonicley P. Silva'
                            value={form.entity}
                            onChange={handleSubmit}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Orgão"
                            name='organ'
                            placeholder='Jhonicley P. Silva'
                            value={form.organ}
                            onChange={handleSubmit}
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
                            name='council'
                            placeholder='Jhonicley P. Silva'
                            value={form.council}
                            onChange={handleSubmit}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Portaria"
                            name='concierge'
                            placeholder='Jhonicley P. Silva'
                            value={form.concierge}
                            onChange={handleSubmit}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Sigla"
                            name='sigla'
                            placeholder='Jhonicley P. Silva'
                            value={form.sigla}
                            onChange={handleSubmit}
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            type='text'
                            label="Equipe"
                            name='equip'
                            placeholder='Jhonicley P. Silva'
                            value={form.equip}
                            onChange={handleSubmit}
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
                                name='email'
                                placeholder='Jhonicley P. Silva'
                                value={form.email}
                                onChange={handleSubmit}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Observações"
                                name='comments'
                                placeholder='Jhonicley P. Silva'
                                value={form.comments}
                                onChange={handleSubmit}
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
                                name='unit'
                                placeholder='Jhonicley P. Silva'
                                value={form.unit}
                                onChange={handleSubmit}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Oficio que solicitou"
                                name='OfficeRequested'
                                placeholder='Jhonicley P. Silva'
                                value={form.OfficeRequested}
                                onChange={handleSubmit}
                                focused
                                margin='normal'
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <TextField
                                type='text'
                                label="Oficio que indicou"
                                name='AppointedOffice'
                                placeholder='Jhonicley P. Silva'
                                value={form.AppointedOffice}
                                onChange={handleSubmit}
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