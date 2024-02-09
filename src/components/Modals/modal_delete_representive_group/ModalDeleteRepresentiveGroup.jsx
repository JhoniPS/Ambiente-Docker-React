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

export default function ModalDeleteRepresentiveGroup({ GroupId, RepresentativeId, data, setData }) {
    const [open, setOpen] = useState(false);
    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            const updatedData = data.filter(item => item.id !== RepresentativeId);
            setData(updatedData);

            const updatedRepresentatives = updatedData.map(item => item.id);

            await api.put(`group/${GroupId}`, {
                representatives: updatedRepresentatives,
            });

            setMessage('Representante deletado com sucesso!');
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
                    <CModalTitle id="titulo">Deletar Representante</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir este representante?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={handleDelete}>
                        Excluir
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
