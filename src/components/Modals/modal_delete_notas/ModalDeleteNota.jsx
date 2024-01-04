import React, { useState } from 'react';
import api from '../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

import styleButton from './modal_delete.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconContext } from 'react-icons';
import { BsFillTrashFill } from 'react-icons/bs';
import { Typography } from '@mui/material';

const style = {
    display: 'flex',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    gap: '1.5em',
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

function ModalDeleteNota({ idNote, data, setData }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const handlDelete = async () => {
        try {
            await api.delete(`/group/${id}/notes/${idNote}`);
            const updatedData = data.filter(item => item.id !== idNote);
            setData(updatedData);
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: 'Deletado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
        } catch (error) {
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: 'Ops! algo deu errado',
                    messageType: 'error',
                    showMessage: true,
                }
            });
        }
    };

    return (
        <div>
            <IconContext.Provider value={{ color: "#93000A", size: 25 }}>
                <button onClick={handleOpen} className={styleButton.button}>
                    <BsFillTrashFill />
                </button>
            </IconContext.Provider>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={styleTitle}>Deletar Nota</Typography>
                    <Typography sx={styleDescrition}>Você tem certeza que deseja excluir esta nota?</Typography>
                    <div className={styleButton.button_container}>
                        <button onClick={handleClose} className={styleButton.cancelar}>Cancelar</button>
                        <button onClick={handlDelete} className={styleButton.excluir}>Excluir</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalDeleteNota;
