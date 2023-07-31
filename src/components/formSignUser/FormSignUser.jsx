import React, { useState } from 'react';

import { TextField } from '@mui/material';

import styles from './formSignUser.module.css'

import LinkButton from '../layout/linkbutton/LinkButton';
import SubmitButton from '../layout/submitbuttun/SubmitButton';
import { Select, ConfigProvider } from 'antd';

const options = [];

for (let i = 1; i < 36; i++) {
    options.push({
        value: 'Type' + i,
        label: 'Type' + i,
    });
}

const FormSignUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Amostra:", {name, email})

    }

    const onChange = (value) => {
        console.log(`select: ${value}`)
    }

    const onSearch = (value) => {
        console.log(`search: ${value}`)
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
                    name='new password'
                    placeholder='Digite uma nova senha'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focused
                    sx={{
                        width: 350,
                    }}
                />

                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#2C74AC',
                            lineWidth: 2,
                            controlHeight: 45,
                        },
                    }}
                >
                    <Select
                        showSearch
                        getPopupContainer={(trigger) => {
                            return trigger;
                        }}
                        style={{
                            width: '100%',

                        }}
                        size='large'
                        label="Tipo de Usuário"
                        placeholder="Selecione um tipo de usuário"
                        onChange={onChange}
                        optionFilterProp='children'
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options}
                    />
                </ConfigProvider>

                <div>
                    <LinkButton text="Voltar" to="/users" customClass="button_back" />
                    <SubmitButton text="Cadastrar" customClass="button_editar_perfil" />
                </div>
            </form>
        </div >
    );
};

export default FormSignUser;