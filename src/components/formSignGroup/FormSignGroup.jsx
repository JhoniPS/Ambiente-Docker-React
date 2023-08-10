import React, { useState } from 'react';

import { TextField } from '@mui/material';

import styles from './formSignGroup.module.css'

import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';

const FormSignGroup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [entity, setEntity] = useState("");
    const [organ, setOrgan] = useState("");
    const [council, setCouncil] = useState("");
    const [concierge, setConcierge] = useState("");
    const [sigla, setSigla] = useState("");
    const [equip, setEquip] = useState("");
    const [unit, setUnit] = useState("")
    const [comments, setComments] = useState("");
    const [OfficeRequested, setOfficeRequested] = useState("")
    const [AppointedOffice, setAppointedOffice] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Amostra:", { 
            name, entity, organ, council, concierge, sigla, equip,
            email, comments, unit, OfficeRequested, AppointedOffice
        });

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
                            name='entity'
                            placeholder='Jhonicley P. Silva'
                            value={entity}
                            onChange={(e) => setEntity(e.target.value)}
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
                            value={organ}
                            onChange={(e) => setOrgan(e.target.value)}
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
                            value={council}
                            onChange={(e) => setCouncil(e.target.value)}
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
                            value={concierge}
                            onChange={(e) => setConcierge(e.target.value)}
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
                            value={sigla}
                            onChange={(e) => setSigla(e.target.value)}
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
                            value={equip}
                            onChange={(e) => setEquip(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
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
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
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
                                value={OfficeRequested}
                                onChange={(e) => setOfficeRequested(e.target.value)}
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
                                value={AppointedOffice}
                                onChange={(e) => setAppointedOffice(e.target.value)}
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