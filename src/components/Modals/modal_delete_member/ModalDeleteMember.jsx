import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

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
import { useParams } from 'react-router-dom';

export default function ModalDeleteMember({ memberId, data, setData }) {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const { setShowMessage, setMessage, setMessageType } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            await api.delete(`/groups/${id}/members/${memberId}`);
            const updatedData = data.filter(item => item.id !== memberId);
            setData(updatedData);
            setMessage('Membro deletado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
        } catch (error) {
            setMessage('Ops!!! Houve algum problema');
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
                    <CModalTitle id="titulo">Deletar Membro</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir este membro?</p>
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
