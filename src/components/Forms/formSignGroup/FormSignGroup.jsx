import React from 'react';
import { TextField } from '@mui/material';
import styles from './formSignGroup.module.css'

const FormSignGroup = ({ form, setForm }) => {

    const handleSubmit = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className={styles.form}>
            <div className={styles.container_input1}>
                <TextField
                    type='text'
                    label="Conselho"
                    variant="standard"
                    name='council'
                    placeholder='Digite o conselho'
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
                    label="Orgão"
                    variant="standard"
                    name='organ'
                    placeholder='Digite o orgão'
                    value={form.organ}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />
                <TextField
                    type='text'
                    label="Time"
                    variant="standard"
                    name='team'
                    placeholder='Digite a equipe'
                    value={form.team}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />
                <TextField
                    type='text'
                    label="E-mail"
                    variant="standard"
                    name='email'
                    placeholder='Digite o e-mail'
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
                    label="Oficio que indicou"
                    variant="standard"
                    name='office_indicated'
                    placeholder='Digite o oficio indicado'
                    value={form.office_indicated}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />
            </div>

            <div className={styles.container_input2}>
                <TextField
                    type='text'
                    label="Entidade"
                    variant="standard"
                    name='entity'
                    placeholder='Digite a entidade'
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
                    label="Sigla"
                    variant="standard"
                    name='acronym'
                    placeholder='Digite a sigla'
                    value={form.acronym}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    type='text'
                    label="Unidade"
                    variant="standard"
                    name='unit'
                    placeholder='Digite a unidade'
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
                    label="Portaria Interna"
                    variant="standard"
                    name='internal_concierge'
                    placeholder='Digite a portaria'
                    value={form.internal_concierge}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    type='text'
                    label="Oficio Solicitado"
                    variant="standard"
                    name='office_requested'
                    placeholder='Digite o oficio solicitado'
                    value={form.office_requested}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />
            </div>
        </div>
    );
};

export default FormSignGroup;