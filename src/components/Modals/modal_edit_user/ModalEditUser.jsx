import React, { Fragment, useState } from 'react';
import styles from './EditUser.module.css'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconContext } from 'react-icons';
import { TextField } from '@mui/material';
import { IoPencilSharp } from "react-icons/io5";
import { Select, ConfigProvider } from 'antd';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';


const options = [];

for (let i = 1; i < 36; i++) {
    options.push({
        value: 'Type' + i,
        label: 'Type' + i,
    });
}

const EditUser = ({ id, data, setData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Amostra:", { name, email })
    }

    const onChange = (value) => {
        console.log(`select: ${value}`)
    }

    const onSearch = (value) => {
        console.log(`search: ${value}`)
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
                <Button onClick={handleOpen}>
                    <IoPencilSharp />
                </Button>
            </IconContext.Provider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.edit_user}
            >
                    <section>
                        <h4>Editar Usuário</h4>
                        <div>
                            <form className={styles.form} onSubmit={handleSubmit}>
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
                                            width: 350,

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
                                    <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                                    <SubmitButton text="Editar" customClass="button_editar_perfil" />
                                </div>
                            </form>
                        </div >
                    </section>
            </Modal>
        </Fragment>
    )
}

export default EditUser;