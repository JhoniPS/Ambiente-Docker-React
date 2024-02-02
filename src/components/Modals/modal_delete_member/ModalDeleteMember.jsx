import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api'

import { IconContext } from 'react-icons';
import { BsFillTrashFill } from "react-icons/bs";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

export default function ModalDeleteMember({ memberId, groupId, data, setData }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setShowMessage, setMessage, setMessageType } = useAuthContext();

    const handlDelete = async () => {
        try {
            await api.delete(`/group/${groupId}/members/${memberId}`);
            const updatedData = data.filter(item => item.id !== memberId);
            setData(updatedData);
            setMessage('Membro deletado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
        } catch (error) {
            setMessage('Ops!!! houve algum problema');
            setMessageType('error');
            setShowMessage(true);
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
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
                    <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={handlDelete}>Excluir</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
