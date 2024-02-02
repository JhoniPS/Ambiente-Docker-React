import React, { useState } from 'react';
import api from '../../../services/api';
import useAuthContext from '../../contexts/Auth';
import { useNavigate, useParams } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { BsFillTrashFill } from "react-icons/bs";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

function ModalDeleteMeet({ idMeet, data, setData }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const { id } = useParams();

    const handlDelete = async () => {
        try {
            await api.delete(`/group/${id}/meeting-history/${idMeet}`);

            const updatedData = data.filter(item => item.id !== idMeet);
            setData(updatedData);
            setMessage('Deletado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setMessage('Ops! algo deu errado');
            setMessageType('error');
            setShowMessage(true);
            handleClose();
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
                    <CModalTitle id="titulo">Deletar Reuião</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir esta reunião?</p>
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

export default ModalDeleteMeet;
