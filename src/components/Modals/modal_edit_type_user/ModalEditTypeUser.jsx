import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import { IconContext } from 'react-icons';
import { AiFillEdit } from 'react-icons/ai';
import { CButton, CCol, CContainer, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';

export default function EditTypeUser({ id, data, setData }) {
    const { error, messageErrors } = useAuthContext();

    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handlEdit = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/type-user/${id}`, { name });

            const updatedData = data.map(item => {
                if (item.id === id) {
                    return { ...item, name };
                }
                return item;
            });
            setData(updatedData);
            navigate('/administrador', {
                state: {
                    message: 'Atualizado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/type-user/${id}`);
                setName(response.data.name);
            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchData();
        }
    }, [open, id]);

    return (
        <>
            <IconContext.Provider value={{ color: '#2C74AC', size: 20 }}>
                <CButton onClick={handleOpen} color='null'>
                    <AiFillEdit />
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
                    <CModalTitle id="titulo">Editar Tipo de Usuário</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type='text'
                                    label="Nome"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handlEdit}>Editar</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
