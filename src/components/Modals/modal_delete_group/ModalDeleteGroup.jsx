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

export default function ModalEditGroup({ id, data, setData }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const handleDelete = async () => {
        try {
            await api.delete(`/groups/${id}`);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            setMessage('Grupo deletado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setMessage('Ops! Algo deu errado');
            setMessageType('error');
            setShowMessage(true);
            handleClose();
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#93000A', size: 25 }}>
                <CButton onClick={handleOpen} color="null">
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
                    <CModalTitle id="titulo">Deletar grupo</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir este grupo?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={handleDelete}>
                        Excluir
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
