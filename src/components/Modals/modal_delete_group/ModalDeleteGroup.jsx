import React, { useState } from 'react';
import api from '../../../services/api'
import { useNavigate } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { BsFillTrashFill } from "react-icons/bs";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

export default function ModalEditGroup({ id, data, setData }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        setOpen(true);
    }
    const handleClose = (event) => {
        setOpen(false);
    }

    const navigate = useNavigate();

    const handlDelete = async (event) => {
        try {
            await api.delete(`/group/${id}`);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            navigate('/gerente', { state: { message: 'Deletado com sucesso!', messagetype: 'success' } });
            handleClose();
        } catch (e) {
            console.error(e);
            navigate('/gerente', { state: { message: `${e.response.data.errors || 'Ops! algo deu errado'}`, messagetype: 'error' } });
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
                    <CModalTitle id="titulo">Deletar grupo</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir este grupo?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handlDelete}>Excluir</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
