import React, { useState, useEffect } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import styles from './ModalEditRepresentativeGroup.module.css'
import { IconContext } from 'react-icons';
import { IoPencilSharp } from "react-icons/io5";
import { Typography, TextField } from '@mui/material';
import { ConfigProvider } from 'antd';

const style = {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate(80%, 50%)',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    gap: '20px',
    backgroundColor: '#FFF',
    width: '500px',
    height: '300px',
    outline: 'none',
    borderRadius: '3px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};

const styleTitle = {
    color: '#2C74AC',
    textAlign: 'center',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Roboto',
    fontSize: '30px',
    fontStyle: 'normal',
    padding: '2px',
    fontWeight: 500,
    lineHeight: '36px',
};

export default function ModalEditRepresentativeGroup({ GroupId, RepresentativeId, data, setData }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlEdit = async (e) => {
        e.preventDefault()
        try {
            const updatedData = data.map(item =>
                item.id === RepresentativeId ? { ...item, name, email } : item
            );
            
            setData(updatedData);

            await api.put(`users/${RepresentativeId}`, { name, email });

            handleClose();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const representativeData = data.find(item => item.id === RepresentativeId);

        if (representativeData) {
            setName(representativeData.name);
            setEmail(representativeData.email);
        }
    }, [data, RepresentativeId]);

    return (
        <div>
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
            >
                <Box sx={style}>
                    <Typography sx={styleTitle}>Editar tipo de usuário</Typography>
                    <div>
                        <form className={styles.Form} onSubmit={handlEdit}>
                            <TextField
                                type='text'
                                label="Nome"
                                name='name'
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
                            </ConfigProvider>

                            <div>
                                <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                                <SubmitButton text="Editar" customClass="button_editar_perfil" />
                            </div>
                        </form>
                    </div >
                </Box>
            </Modal>
        </div>
    );
}
