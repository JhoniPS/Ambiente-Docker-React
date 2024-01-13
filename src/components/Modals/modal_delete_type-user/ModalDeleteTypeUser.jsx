import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../contexts/Auth';

import { IconContext } from 'react-icons';
import { BsFillTrashFill } from 'react-icons/bs';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import api from '../../../services/api';

export default function ModalDeleteUser({ id, data, setData }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handlDelete = async () => {
        try {
            await api.delete(`/type-user/${id}`);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            navigate('/administrador', {
                state: {
                    message: 'Deletado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
        } catch (e) {
            navigate('/administrador', {
                state: {
                    message: `${e.reponse.errors}`,
                    messageType: 'error',
                    showMessage: true,
                }
            });
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
                    <CModalTitle id="titulo">Deletar Tipo de Usuário</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Você tem certeza que deseja excluir esse tipo de usuário?</p>
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
