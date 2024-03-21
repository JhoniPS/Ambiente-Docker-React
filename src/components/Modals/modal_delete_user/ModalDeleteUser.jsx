import React, { useState } from 'react';
import api from '../../../services/api';
import useAuthContext from '../../contexts/Auth';
import { IconContext } from 'react-icons';
import { BsFillTrashFill } from 'react-icons/bs';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

export default function ModalDeleteUser({ id, data, setData }) {
    const [open, setOpen] = useState(false);
    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            await api.delete(`users/${id}`);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            handleClose();
            setMessage('Usuário deletado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            console.log(error)
            handleClose();
            setMessage(`${error.response.data.errors}`);
            setMessageType('error');
            setShowMessage(true);
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#93000A', size: 20 }}>
                <CButton onClick={handleOpen} color='null'>
                    <BsFillTrashFill />
                </CButton>
            </IconContext.Provider>
            <CModal
                alignment="center"
                visible={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CModalHeader onClose={handleClose}>
                    <CModalTitle id="titulo">Deletar Usuário</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir esse usuário?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} color='null' onClick={handleDelete}>
                        Excluir
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
