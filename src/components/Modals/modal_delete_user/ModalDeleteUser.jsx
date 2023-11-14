import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import styleButton from './modal_delete.module.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconContext } from 'react-icons';
import { IoTrash } from "react-icons/io5";
import { Typography } from '@mui/material';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    gap: '2em',
    backgroundColor: '#FFDAD6',
    width: '400px',
    height: '200px',
    padding: '2.5rem',
    outline: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};

const styleDescrition = {
    color: '#1D1B20',
    alignSelf: 'stretch',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Roboto',
    fontSize: '19px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.20px'
};

const styleTitle = {
    color: '#1D1B20',
    alignSelf: 'stretch',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Roboto',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.25px'
};

export default function ModalDeleteUser({ id, data, setData }) {
    const { deleteUser } = useAuthContext();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlDelete = async () => {
        try {
            await deleteUser({ id })
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
                <Button onClick={handleOpen}>
                    <IoTrash />
                </Button>
            </IconContext.Provider>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={styleTitle}>Deletar usuário</Typography>
                    <Typography sx={styleDescrition}>Você tem certeza que deseja excluir este usuário?</Typography>
                    <div className={styleButton.button_container}>
                        <button onClick={handleClose} className={styleButton.cancelar}>Cancelar</button>
                        <button onClick={handlDelete} className={styleButton.excluir}>Excluir</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
